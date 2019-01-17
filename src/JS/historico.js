var ID_AGENDAMENTOS = $('#inputId').val();
var ID_AGENGAMENTOS_RESPONSAVEIS = 0;
var AGENDAMENTOS_LIST = "Agendamentos";
var AGENDAMENTOS_RESPONSAVEIS_LIST = "Agendamentos - Responsáveis";

// var AGENDAMENTOS_REST_QUERY = "/_api/web/lists/GetByTitle('" + AGENDAMENTOS_LIST + "')/items(" + ID_AGENDAMENTOS + ")/Versions?$select=VersionLabel,Created,IsCurrentVersion,Title,CodigoProduto,LinhaProduto,DescricaoProduto,Projeto,CategoriaProjeto,Motivo,TipoLote,QuantidadePecas,Formula,EnvioAmostras,ResponsavelAmostra,QuantidadeAmostra,InicioProgramado,DuracaoEstimadaHoras,DuracaoEstimadaMinutos,FimProgramado,Fabrica,LinhaEquipamento,CentroCusto,GrauComplexidade,MaoObra,Observacoes,Status,EngenhariaFabricacaoAcompanhamen,EngenhariaEnvaseAcompanhamento,InovacaoDfAcompanhamento,InovacaoDeAcompanhamento,QualidadeAcompanhamento,FabricaAcompanhamento,CodigoAgendamento,NaoExecutadoMotivo,NaoExecutadoComentarios,CanceladoMotivo,CanceladoComentarios,ReagendamentoContador,CalendarioTitulo,CalendarioSubtitulo,Executado,MeioAmbienteAcompanhamento,RegistroAnalisesInicio,LinhaEquipamento,Editor&$expand=Linha_x005f_x0020_x005f_ou_x005f_x0020_x005f_Equipamento/ID&$orderby=VersionLabel asc";
var AGENDAMENTOS_REST_QUERY = "/_api/web/lists/GetByTitle('" + AGENDAMENTOS_LIST + "')/items(" + ID_AGENDAMENTOS + ")/Versions?$select=VersionLabel,Created,Title,CodigoProduto,LinhaProduto,DescricaoProduto,Projeto,CategoriaProjeto,Motivo,TipoLote,QuantidadePecas,Formula,EnvioAmostras,ResponsavelAmostra,QuantidadeAmostra,InicioProgramado,DuracaoEstimadaHoras,DuracaoEstimadaMinutos,FimProgramado,Fabrica,LinhaEquipamento,CentroCusto,GrauComplexidade,MaoObra,Observacoes,Status,EngenhariaFabricacaoAcompanhamen,EngenhariaEnvaseAcompanhamento,InovacaoDfAcompanhamento,InovacaoDeAcompanhamento,QualidadeAcompanhamento,FabricaAcompanhamento,CodigoAgendamento,NaoExecutadoMotivo,NaoExecutadoComentarios,CanceladoMotivo,CanceladoComentarios,ReagendamentoContador,CalendarioTitulo,CalendarioSubtitulo,Executado,MeioAmbienteAcompanhamento,RegistroAnalisesInicio,LinhaEquipamento,Editor&$expand=Linha_x005f_x0020_x005f_ou_x005f_x0020_x005f_Equipamento/ID&$orderby=VersionLabel asc";
var AGENDAMENTOS_RESPONSAVEIS_REST_QUERY = "/_api/web/lists/GetByTitle('" + AGENDAMENTOS_RESPONSAVEIS_LIST + "')/items(" + ID_AGENGAMENTOS_RESPONSAVEIS + ")/Versions";

class Agendamento {
    constructor() {
        this.propriedades = {};
    }

    add(propriedade) {
        this.propriedades[propriedade.nome] = propriedade;
    }

    find(nome) {
        return this.propriedades[nome];
    }
}

class AgendamentoResponsavel {
    constructor() {
        this.propriedades = {};
    }

    add(propriedade) {
        this.propriedades[propriedade.nome] = propriedade;
    }

    find(nome) {
        return this.propriedades[nome];
    }
}

class AgendamentoProcessado {
    constructor() {
        this.propriedades = {};
    }

    add(propriedade) {
        this.propriedades[propriedade.nome] = propriedade;
    }

    find(nome) {
        return this.propriedades[nome];
    }
}

class Propriedade {
    constructor(nome, tipo, valor) {
        this.nome = nome;
        this.tipo = tipo;
        this.valor = valor;
    }
}

var openAGENDAMENTOS_Call = $.ajax({
    url: _spPageContextInfo.webAbsoluteUrl + AGENDAMENTOS_REST_QUERY,
    type: "GET",
    dataType: "json",
    headers: {
        Accept: "application/json;odata=verbose"
    }
});

// var openAGENDAMENTOS_RESPONSAVEIS_Call = $.ajax({
//     url: _spPageContextInfo.webAbsoluteUrl + AGENDAMENTOS_RESPONSAVEIS_REST_QUERY,
//     type: "GET",
//     dataType: "json",
//     headers: {
//         Accept: "application/json;odata=verbose"
//     }
// });


var agendamentos = [];
var agendamentosProcessados = [];

openAGENDAMENTOS_Call.done(function (data, textStatus, jqXHR) {

    for (index in data.d.results) {
        var agendamento = new Agendamento();
        agendamento.add(new Propriedade('VersionLabel', 'string', (typeof data.d.results[index].VersionLabel === "undefined") ? '' : data.d.results[index].VersionLabel));
        agendamento.add(new Propriedade('Created', 'date', (typeof moment.utc(data.d.results[index].Created).local() === "undefined") ? '' : moment.utc(data.d.results[index].Created).local()));
        // agendamento.add(new Propriedade('IsCurrentVersion', 'string', (typeof data.d.results[index].IsCurrentVersion === "undefined") ? '' : data.d.results[index].IsCurrentVersion));
        agendamento.add(new Propriedade('Title', 'string', (typeof data.d.results[index].Title === "undefined") ? '' : data.d.results[index].Title));
        agendamento.add(new Propriedade('CodigoProduto', 'string', (typeof data.d.results[index].CodigoProduto === "undefined") ? '' : data.d.results[index].CodigoProduto));
        agendamento.add(new Propriedade('LinhaProduto', 'string', (typeof data.d.results[index].LinhaProduto === "undefined") ? '' : data.d.results[index].LinhaProduto));
        agendamento.add(new Propriedade('DescricaoProduto', 'string', (typeof data.d.results[index].DescricaoProduto === "undefined") ? '' : data.d.results[index].DescricaoProduto));
        agendamento.add(new Propriedade('Projeto', 'string', (typeof data.d.results[index].Projeto === "undefined") ? '' : data.d.results[index].Projeto));
        agendamento.add(new Propriedade('CategoriaProjeto', 'string', (typeof data.d.results[index].CategoriaProjeto === "undefined") ? '' : data.d.results[index].CategoriaProjeto));
        agendamento.add(new Propriedade('Motivo', 'string', (typeof data.d.results[index].Motivo === "undefined") ? '' : data.d.results[index].Motivo));
        agendamento.add(new Propriedade('TipoLote', 'string', (typeof data.d.results[index].TipoLote === "undefined") ? '' : data.d.results[index].TipoLote));
        agendamento.add(new Propriedade('QuantidadePecas', 'string', (typeof data.d.results[index].QuantidadePecas === "undefined") ? '' : data.d.results[index].QuantidadePecas));
        agendamento.add(new Propriedade('Formula', 'string', (typeof data.d.results[index].Formula === "undefined") ? '' : data.d.results[index].Formula));
        agendamento.add(new Propriedade('EnvioAmostras', 'string', (typeof data.d.results[index].EnvioAmostras === "undefined") ? '' : data.d.results[index].EnvioAmostras));
        agendamento.add(new Propriedade('ResponsavelAmostra', 'string', (typeof data.d.results[index].ResponsavelAmostra === "undefined") ? '' : data.d.results[index].ResponsavelAmostra));
        agendamento.add(new Propriedade('QuantidadeAmostra', 'string', (typeof data.d.results[index].QuantidadeAmostra === "undefined") ? '' : data.d.results[index].QuantidadeAmostra));
        agendamento.add(new Propriedade('InicioProgramado', 'date', (typeof moment.utc(data.d.results[index].InicioProgramado).local() === "undefined") ? '' : moment.utc(data.d.results[index].InicioProgramado).local()));
        agendamento.add(new Propriedade('DuracaoEstimadaHoras', 'string', (typeof data.d.results[index].DuracaoEstimadaHoras === "undefined") ? '' : data.d.results[index].DuracaoEstimadaHoras));
        agendamento.add(new Propriedade('DuracaoEstimadaMinutos', 'string', (typeof data.d.results[index].DuracaoEstimadaMinutos === "undefined") ? '' : data.d.results[index].DuracaoEstimadaMinutos));
        agendamento.add(new Propriedade('FimProgramado', 'date', (typeof moment.utc(data.d.results[index].FimProgramado).local() === "undefined") ? '' : moment.utc(data.d.results[index].FimProgramado).local()));
        agendamento.add(new Propriedade('Fabrica', 'string', (typeof data.d.results[index].Fabrica.LookupValue === "undefined") ? '' : data.d.results[index].Fabrica.LookupValue));
        agendamento.add(new Propriedade('LinhaEquipamento', 'string', (typeof data.d.results[index].LinhaEquipamento.LookupValue === "undefined") ? '' : data.d.results[index].LinhaEquipamento.LookupValue));
        agendamento.add(new Propriedade('CentroCusto', 'string', (typeof data.d.results[index].CentroCusto === "undefined") ? '' : data.d.results[index].CentroCusto));
        agendamento.add(new Propriedade('GrauComplexidade', 'string', (typeof data.d.results[index].GrauComplexidade === "undefined") ? '' : data.d.results[index].GrauComplexidade));
        agendamento.add(new Propriedade('MaoObra', 'string', (typeof data.d.results[index].MaoObra === "undefined") ? '' : data.d.results[index].MaoObra));
        agendamento.add(new Propriedade('Observacoes', 'string', (typeof data.d.results[index].Observacoes === "undefined") ? '' : data.d.results[index].Observacoes));
        agendamento.add(new Propriedade('Status', 'string', (typeof data.d.results[index].Status === "undefined") ? '' : data.d.results[index].Status));
        agendamento.add(new Propriedade('EngenhariaFabricacaoAcompanhamen', 'string', (typeof data.d.results[index].EngenhariaFabricacaoAcompanhamen === "undefined") ? '' : data.d.results[index].EngenhariaFabricacaoAcompanhamen));
        agendamento.add(new Propriedade('EngenhariaEnvaseAcompanhamento', 'string', (typeof data.d.results[index].EngenhariaEnvaseAcompanhamento === "undefined") ? '' : data.d.results[index].EngenhariaEnvaseAcompanhamento));
        agendamento.add(new Propriedade('InovacaoDfAcompanhamento', 'string', (typeof data.d.results[index].InovacaoDfAcompanhamento === "undefined") ? '' : data.d.results[index].InovacaoDfAcompanhamento));
        agendamento.add(new Propriedade('InovacaoDeAcompanhamento', 'string', (typeof data.d.results[index].InovacaoDeAcompanhamento === "undefined") ? '' : data.d.results[index].InovacaoDeAcompanhamento));
        agendamento.add(new Propriedade('QualidadeAcompanhamento', 'string', (typeof data.d.results[index].QualidadeAcompanhamento === "undefined") ? '' : data.d.results[index].QualidadeAcompanhamento));
        agendamento.add(new Propriedade('FabricaAcompanhamento', 'string', (typeof data.d.results[index].FabricaAcompanhamento === "undefined") ? '' : data.d.results[index].FabricaAcompanhamento));
        agendamento.add(new Propriedade('CodigoAgendamento', 'string', (typeof data.d.results[index].CodigoAgendamento === "undefined") ? '' : data.d.results[index].CodigoAgendamento));
        agendamento.add(new Propriedade('NaoExecutadoMotivo', 'string', (typeof data.d.results[index].NaoExecutadoMotivo === "undefined") ? '' : data.d.results[index].NaoExecutadoMotivo));
        agendamento.add(new Propriedade('NaoExecutadoComentarios', 'string', (typeof data.d.results[index].NaoExecutadoComentarios === "undefined") ? '' : data.d.results[index].NaoExecutadoComentarios));
        agendamento.add(new Propriedade('CanceladoMotivo', 'string', (typeof data.d.results[index].CanceladoMotivo === "undefined") ? '' : data.d.results[index].CanceladoMotivo));
        agendamento.add(new Propriedade('CanceladoComentarios', 'string', (typeof data.d.results[index].CanceladoComentarios === "undefined") ? '' : data.d.results[index].CanceladoComentarios));
        agendamento.add(new Propriedade('ReagendamentoContador', 'string', (typeof data.d.results[index].ReagendamentoContador === "undefined") ? '' : data.d.results[index].ReagendamentoContador));
        agendamento.add(new Propriedade('CalendarioTitulo', 'string', (typeof data.d.results[index].CalendarioTitulo === "undefined") ? '' : data.d.results[index].CalendarioTitulo));
        agendamento.add(new Propriedade('CalendarioSubtitulo', 'string', (typeof data.d.results[index].CalendarioSubtitulo === "undefined") ? '' : data.d.results[index].CalendarioSubtitulo));
        agendamento.add(new Propriedade('Executado', 'string', (typeof data.d.results[index].Executado === "undefined") ? '' : data.d.results[index].Executado));
        agendamento.add(new Propriedade('MeioAmbienteAcompanhamento', 'string', (typeof data.d.results[index].MeioAmbienteAcompanhamento === "undefined") ? '' : data.d.results[index].MeioAmbienteAcompanhamento));
        agendamento.add(new Propriedade('RegistroAnalisesInicio', 'string', (typeof data.d.results[index].RegistroAnalisesInicio === "undefined") ? '' : data.d.results[index].RegistroAnalisesInicio));
        agendamento.add(new Propriedade('LinhaEquipamento', 'string', (typeof data.d.results[index].Linha_x005f_x0020_x005f_ou_x005f_x0020_x005f_Equipamento.LookupValue === "undefined") ? '' : data.d.results[index].Linha_x005f_x0020_x005f_ou_x005f_x0020_x005f_Equipamento.LookupValue));
        agendamento.add(new Propriedade('Editor', 'string', (typeof data.d.results[index].Editor.LookupValue === "undefined") ? '' : data.d.results[index].Editor.LookupValue));
        agendamentos.push(agendamento);

        if (index > 0) {
            console.log("Processando: " + agendamentos[index].find('VersionLabel').valor);
            agendamentosProcessados.push(ProcessaAgendamento(agendamentos[index], agendamentos[index - 1]));
        }
        else {
            console.log("Processando: " + agendamentos[index].find('VersionLabel').valor);
            agendamentosProcessados.push(agendamento);
        }
    }
    ProcessaHistorico(agendamentosProcessados);
});

function ProcessaAgendamento(agendamentoAtual, agendamentoAnterior) {
    var agendamentoProcessado = new AgendamentoProcessado();

    $.each(agendamentos[0].propriedades,
        function (index, value) {
            if (agendamentoAtual.find(value.nome).valor !== agendamentoAnterior.find(value.nome).valor) {
                var prop = new Propriedade(agendamentoAtual.find(value.nome).nome, agendamentoAtual.find(value.nome).tipo, agendamentoAtual.find(value.nome).valor);
                agendamentoProcessado.add(prop);
            }
        });
    return agendamentoProcessado;
}

function ProcessaHistorico(agendamentosProc) {
    $.each(agendamentosProc,
        function (indexAgend, agend) {
            console.log("Versão: " + agend.find('VersionLabel').valor);
            console.log("Modificado em: " + agend.find('Created').valor);
            console.log("Modificado Por: Teste");
            $('#data-table').append("<tr>" +
                "<td>" +
                agend.find('VersionLabel').valor +
                "</td>" +
                "<td>" +
                RetornaData(agend.find('Created').valor) +
                +"</td>" +
                "<td>" +
                // agend.find('Editor').valor+
                "Editado por Teste"
                + "</td>" +
                "</tr>");
            $.each(agend.propriedades, function (indexProp, prop) {
                if (agend.find(prop.nome).nome === 'VersionLabel' || agend.find(prop.nome).nome === 'Created' || agend.find(prop.nome).nome === 'Editor') {

                }
                else if (agend.find(prop.nome).tipo === 'date') {
                    $('#data-table').append("<tr>" +
                        "<td>" +
                        "</td>" +
                        "<td>" +
                        agend.find(prop.nome).nome +
                        "</td>" +
                        "<td>" +
                        RetornaData(agend.find(prop.nome).valor) +
                        "</td>" +
                        "</tr>");
                }
                else {
                    $('#data-table').append("<tr>" +
                        "<td>" +
                        "</td>" +
                        "<td>" +
                        agend.find(prop.nome).nome +
                        "</td>" +
                        "<td>" +
                        agend.find(prop.nome).valor +
                        "</td>" +
                        "</tr>");
                }
            });
        });
}

function RetornaData(data) {
    var novaData = new Date(data);
    var dd = novaData.getDate();
    if (dd < 10) {
        dd = "0" + dd;
    }
    var mm = novaData.getMonth() + 1;
    if (mm < 10) {
        mm = "0" + mm;
    }

    var yyyy = novaData.getFullYear();

    return dd + "-" + mm + "-" + yyyy;
}