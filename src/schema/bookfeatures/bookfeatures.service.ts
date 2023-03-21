import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ReportFilterException } from 'src/common/filters/report.filter';
import { BookService } from '../book/book.service';
import { User } from '../users/entities/user.entity';
import { UpdateReportBookInput } from './dto/input';
import { ReportBookInput } from './dto/input/reportBook.input';
import { UpdateBookfeatureInput } from './dto/update-bookfeature.input';
import { ReportBook } from './entities/reportBook.entity';
import { QueryReportArgs } from './dto/args/query.report.args';
import { ReportListResponse } from './types/reportBook.type';

@Injectable()
export class BookfeaturesService {
  constructor(
    private readonly bookService: BookService,
    @InjectModel(ReportBook.name)
    private readonly reportBookModel: Model<ReportBook>,
  ) {}

  async addCreateReportBook(reportBookInput: ReportBookInput, user: User) {
    const bookExist = await this.bookService.findByIdBook(
      reportBookInput.bookId,
    );

    //  console.log( user._id.toString() )
    // console.log(bookExist.authorId.toString() )

    // if(bookExist.authorId.toString() !== user._id.toString() ) console.log('es el mismo')
    if (bookExist.authorId.toString() === user._id.toString())
      ReportFilterException.prototype.handlerDBError(null, 2);

    const existeReport = await this.findOneReportIduser(
      reportBookInput.bookId,
      user,
    );

    const createReport = await this.reportBookModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...reportBookInput,
      booktitle: bookExist.title,
      authorId: bookExist.authorId,
      userIdReport: user._id,
      userEmail: user.email,
      bookId: bookExist._id,
      status: 1,
    });

    return createReport;
  }

  async findOneReportIduser(id: string, user: User) {
    const reportExist = await this.reportBookModel.findOne({
      bookId: new mongoose.Types.ObjectId(id),
      userIdReport: new mongoose.Types.ObjectId(user._id),
    });

    if (reportExist) ReportFilterException.prototype.handlerDBError(null, 1);
    return reportExist;
  }

  async updateReportBook(updateReport: UpdateReportBookInput, user: User) {
    //console.log(user)
    //  console.log(updateReport)

    if (user.user_type !== 2)
      ReportFilterException.prototype.handlerDBError(null, 3);

    // if(updateReport.borrarReporteBD >= 2 || updateReport.desactivarReporte >= 2 ) ReportFilterException.prototype.handlerDBError(null, 4);

    const existeReporte = await this.findByIdReport(updateReport.id);

    if (updateReport.desactivarReporte === 1) {
      existeReporte.status = 0;
      existeReporte.save();
      // console.log(existeReporte)
      return [existeReporte];
    }

    if (updateReport.borrarReporteBD === 1) {
      existeReporte.deleteOne({
        _id: new mongoose.Types.ObjectId(updateReport.id),
      });
      return [];
    }

    return [existeReporte];
  }

  async findByIdReport(id: string) {
    const existeReporte = await this.reportBookModel.findById(id);

    if (!existeReporte) ReportFilterException.prototype.handlerDBError(null, 5);

    return existeReporte;
  }

  async findAllReport(query: QueryReportArgs, user: User):Promise<ReportListResponse> {
    const { page, perPage } = query;
    // if (query.status >= 2)
    //   ReportFilterException.prototype.handlerDBError(null, 4);

    let queryBook = {};

    if (query.reportId) {
      //Todo revisar si existe el reporte

      queryBook = {
        _id: new mongoose.Types.ObjectId(query.reportId)
      };
    } else {
      queryBook = {
        status: 1,
      };
    }

    const contador = await this.reportBookModel.count(queryBook);

    const reportBook = await this.reportBookModel.aggregate([
      { $match: queryBook },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
    ]);

    
    const totalPagina = Math.ceil(contador / perPage);

    //  console.log(totalPagina)

    return {
      reportBook,
      totalPagina
    };
  }

  remove(id: number) {
    return `This action removes a #${id} bookfeature`;
  }
}
