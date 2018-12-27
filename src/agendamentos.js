function CarregarTodosAgendamentos() {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetListItems',
        listName: 'Agendamentos',
        CAMLViewFields: '<ViewFields><FieldRef Name="ID" /><FieldRef Name="CodigoProduto" /><FieldRef Name="Title" /><FieldRef Name="TipoLote" /><FieldRef Name="Motivo" /><FieldRef Name="Status" /><FieldRef Name="RegistroAnalisesInicio" /><FieldRef Name="Modified" /><FieldRef Name="Editor" /><FieldRef Name="InicioProgramado" /><FieldRef Name="_UIVersionString" /></ViewFields>',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).SPFilterNode("z:row").each(function () {
                $('tbody#AgendamentoBody').append('<tr><td><a href="/sites/DEV_LotePiloto/SiteAssets/deploy/dev/natura.html?ID='+$(this).attr("ows_ID")+'">'+$(this).attr("ows_ID")+'</a></td><td>'+$(this).attr("ows_CodigoProduto")+'</td><td>'+$(this).attr("ows_Title")+'</td><td>'+$(this).attr("ows_TipoLote")+'</td><td>'+$(this).attr("ows_Motivo")+'</td><td>'+$(this).attr("ows_Status")+'</td><td>'+$(this).attr("ows_RegistroAnalisesInicio")+'</td><td>'+$(this).attr("ows_Modified")+'</td><td>'+$(this).attr("ows_Editor")+'</td><td>'+$(this).attr("ows_InicioProgramado")+'</td><td>'+$(this).attr("ows__UIVersionString")+'</td></tr>')
            });

            $promise.resolve();
        }
    });

    return $promise;
}


$(document).ready(function () {
    CarregarTodosAgendamentos();
});