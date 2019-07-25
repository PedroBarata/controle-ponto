import { Component, OnInit } from "@angular/core";
import { Ponto } from "src/app/model/ponto.model";
import { ActionService } from "src/app/services/action.service";
import { AuthService } from "src/app/services/auth.service";
import { GoogleChartInterface } from "ng2-google-charts/google-charts-interfaces";
import { UtilsService } from "src/app/services/utils.service";
@Component({
  selector: "app-graph",
  templateUrl: "./graph-view.page.html",
  styles: ["./graph-view.page.scss"]
})
export class GraphViewPage implements OnInit {
  private userId: string;
  private token: string;
  private pontoList: Ponto[] = [];
  public data: GoogleChartInterface;
  public isLoading = true;
  public totalHoursMonth = 0;
  public totalHoursWorked = 0;
  constructor(
    private actionService: ActionService,
    private authService: AuthService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.token = this.authService.getToken();

    const now = new Date();
    const ponto: Ponto = {
      id: undefined,
      status: undefined,
      userId: this.userId,
      mes: now.getMonth()
    };

    this.data = {
      chartType: "Bar",
      dataTable: [["Dia", "Horas de trabalho", "Horas de almoço"]],
      options: {
        chart: {
          title: "Horas trabalhadas"
        }
      }
    };

    this.actionService.getAllByMonth(ponto, this.token).subscribe(response => {
      const val: Ponto[] = Object.values(response);
      val.sort((p1, p2) => (p1.entrada < p2.entrada ? -1 : 1));
      this.pontoList = val;
      this.totalHoursMonth = this.getWorkingHoursByMonth(this.pontoList[0].mes);
      this.dataHandler();
      this.isLoading = false;
    });
  }

  dataHandler() {
    this.pontoList.forEach(ponto => {
      this.getHorasTrabalhadas(ponto);
    });
  }

  getHorasTrabalhadas(ponto: Ponto) {
    const entradaDate = new Date(ponto.entrada);
    const saidaDate = new Date(ponto.saida);
    let inicioAlmocoDate;
    let voltaAlmocoDate;
    let horasAlmoco = 0;
    let horasTrabalhadas = 0;
    if (ponto.inicioAlmoco) {
      inicioAlmocoDate = new Date(ponto.inicioAlmoco);
      voltaAlmocoDate = new Date(ponto.voltaAlmoco);
      const horasPreAlmoco = this.calculaHorasEntreDatas(
        inicioAlmocoDate,
        entradaDate
      );
      const horasPosAlmoco = this.calculaHorasEntreDatas(
        saidaDate,
        voltaAlmocoDate
      );
      horasAlmoco = this.calculaHorasEntreDatas(
        voltaAlmocoDate,
        inicioAlmocoDate
      );
      horasTrabalhadas = horasPosAlmoco + horasPreAlmoco;
    } else {
      horasTrabalhadas = this.calculaHorasEntreDatas(saidaDate, entradaDate);
    }
    this.totalHoursWorked += horasTrabalhadas;

    this.data.dataTable.push([
      entradaDate.getDate().toString(),
      { v: horasTrabalhadas, f: this.numberToTime(horasTrabalhadas) },
      { v: horasAlmoco, f: this.numberToTime(horasAlmoco) }
    ]);
  }

  calculaHorasEntreDatas(date1: Date, date2: Date) {
    if (date1 > date2) {
      return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60);
    } else {
      return (date2.getTime() - date1.getTime()) / (1000 * 60 * 60);
    }
  }

  numberToTime(time: number) {
    const hours = Math.floor(time).toString();
    const mins = ((time - Math.floor(time)) * 60).toFixed(0);
    return `${hours < "10" ? "0" + hours : hours} : ${
      mins < "10" ? "0" + mins : mins
    }`;
  }

  getWorkingHoursByMonth(month: number) {
    let result = 0;
    const startDate = new Date(new Date().getFullYear(), month, 1);
    console.log("[start]", startDate);

    const endDate = new Date(new Date().getFullYear(), month + 1, 0);
    console.log("[end]",endDate);

    var currentDate = startDate;
    while (currentDate <= endDate) {
      var weekDay = currentDate.getDay();
      if (weekDay != 0 && weekDay != 6) result++;

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result*8;
  }
}
