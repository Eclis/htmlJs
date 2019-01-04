
var PATH_TO_DISPFORM = "https://naturabr.sharepoint.com/sites/DEV_LotePiloto/Lists/Agendamentos/DispForm.aspx";
var TASK_LIST = "Agendamentos";
var Fabrica_LIST = "Fábricas Internas e Armazenamento de Fábricas Terceiras";
var coresFabricas = new Array();

var FabricaRESTQuery = "/_api/Web/Lists/GetByTitle('" + Fabrica_LIST + "')/items?$select=ID,Chave"
var FabricaSelecionada = "*";
var openFabricaCall = $.ajax({
    url: _spPageContextInfo.webAbsoluteUrl + FabricaRESTQuery,
    type: "GET",
    dataType: "json",
    headers: {
        Accept: "application/json;odata=verbose"
    }
});


var cores = ["#446AC1", "#E490AE", "#FFA565", "#B2B208", "#88D73C", "#2A9983", "#EDA700", "#8B2F9E", "#999090", "#E40000"];



openFabricaCall.done(function (data, textStatus, jqXHR) {

    for (index in data.d.results) {
        var corNum = index.substr(index.length - 1);
        var corNome = cores[corNum];

        var cor = {};
        cor.id = data.d.results[index].ID;
        cor.cor = corNome;

        coresFabricas.push(cor);

        $('#fabrica-selector').append(
            $('<option/>')
                .attr('value', data.d.results[index].ID)
                .text(data.d.results[index].Chave)
        );
    }
});

$('#fabrica-selector').on('change', function () {
    FabricaSelecionada = this.value;
    DisplayTasks();
});

DisplayTasks();

function DisplayTasks() {

    var initialLocaleCode = 'pt-br';
    $('#calendar').fullCalendar('destroy');

    $('#calendar').fullCalendar({
        buttonText: {
            listMonth: 'Lista'
        },
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listMonth'
        },
        locale: 'pt-br',
        //open up the display form when a user clicks on an event
        eventClick: function (calEvent, jsEvent, view) {
            window.open(PATH_TO_DISPFORM + "?ID=" + calEvent.id, "_blank");
        },
        eventRender: function (eventObj, $el) {
            $el.popover({
                title: eventObj.title,
                content: eventObj.description,
                html: true,
                trigger: 'hover',
                placement: 'top',
                container: 'body'
            });
        },

        editable: false,
        themeSystem: 'bootstrap4',
        eventLimit: true,
        navLinks: true,
        droppable: false, // this allows things to be dropped onto the calendar
        //update the end date when a user drags and drops an event 
        eventDrop: function (event, delta, revertFunc) {
            UpdateTask(event.id, event.end);
        },
        //put the events on the calendar 
        events: function (start, end, timezone, callback) {
            startDate = start.format('YYYY-MM-DD');
            endDate = end.format('YYYY-MM-DD');

            var RESTQuery = "";

            if (FabricaSelecionada != "*") {
                RESTQuery = "/_api/Web/Lists/GetByTitle('" + TASK_LIST + "')/items?$select=ID,Title,Status,InicioProgramado,FimProgramado,CodigoProduto,DescricaoProduto,TipoLote,Fabrica/ID,Fabrica/Chave&$expand=Fabrica&$filter=Fabrica/ID eq " + FabricaSelecionada;
            }
            else {
                RESTQuery = "/_api/Web/Lists/GetByTitle('" + TASK_LIST + "')/items?$select=ID,Title,Status,InicioProgramado,FimProgramado,CodigoProduto,DescricaoProduto,TipoLote,Fabrica/ID,Fabrica/Chave&$expand=Fabrica";
            }

            var opencall = $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + RESTQuery,
                type: "GET",
                dataType: "json",
                headers: {
                    Accept: "application/json;odata=verbose"
                }
            });

            opencall.done(function (data, textStatus, jqXHR) {
                var events = [];
                for (index in data.d.results) {
                    var fabrica = "";
                    var titulo = data.d.results[index].CodigoProduto;
                    var descricaoProduto = data.d.results[index].DescricaoProduto;
                    var tipoLote = data.d.results[index].TipoLote;
                    var cor = "#E40000";
                    var inicio = moment.utc(data.d.results[index].InicioProgramado).local();
                    var fim = moment.utc(data.d.results[index].FimProgramado).local();
                    if (data.d.results[index].Fabrica.Chave) {
                        fabrica = data.d.results[index].Fabrica.Chave;
                        cor = (coresFabricas.filter(obj => { return obj.id === data.d.results[index].Fabrica.ID }))[0].cor
                    }

                    events.push({
                        // title: data.d.results[index].Title ,
                        title: titulo,
                        id: data.d.results[index].ID,
                        color: cor, //specify the background color and border color can also create a class and use className paramter. 
                        start: inicio.format('YYYY-MM-DD HH:mm'),
                        end: fim.format('YYYY-MM-DD HH:mm'), //add one day to end date so that calendar properly shows event ending on that day
                        description: descricaoProduto + "<br /><b>Tipo de Lote: </b>" + tipoLote + "<br /><b>Fábrica: </b>" + fabrica + "<br /><b>Início: </b>" + inicio.format('DD-MM-YYYY HH:mm') + "<br /><b>Fim: </b>" + fim.format('DD-MM-YYYY HH:mm')
                    });
                }

                callback(events);

            });
        }
    });
}

function UpdateTask(id, dueDate) {
    //substract the previoulsy added day to the date to store correct date
    sDate = moment.utc(dueDate).add("-1", "days").format('YYYY-MM-DD') + "T" +
        dueDate.format("hh:mm") + ":00Z";

    var call = jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl +
            "/_api/Web/Lists/getByTitle('" + TASK_LIST + "')/Items(" + id + ")",
        type: "POST",
        data: JSON.stringify({
            DueDate: sDate,
        }),
        headers: {
            Accept: "application/json;odata=nometadata",
            "Content-Type": "application/json;odata=nometadata",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-Http-Method": "PATCH"
        }
    });
    call.done(function (data, textStatus, jqXHR) {
        alert("Update Successful");
        DisplayTasks();
    });
    call.fail(function (jqXHR, textStatus, errorThrown) {
        alert("Update Failed");
        DisplayTasks();
    });
}