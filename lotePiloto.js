function InserirAgendamentoRascunho()
{
    var campos = [];

    $('#main [name]').each(function () {
        var $this = $(this);
        if($this.is('select') && $this.find(':checked').val() != undefined) {
            campos.push([this.name, $this.find(':checked').val()]);
        } else if($this.is('[type=checkbox]') && $this.val() != undefined) {
            campos.push([this.name, ($this.is('[type=checkbox]') == 'on')? 1 : 0]);
        } else if($this.val() != undefined) {
            campos.push([this.name, $this.val()]);
        }
    });

    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "New",
        listName: "Agendamentos",
        valuepairs: campos,
        completefunc: function (xData, Status) {
            alert("Agendamento Salvo como rascunho");
            window.fuck = xData;
            window.fuck2 = Status;
        }
    });

};

function CarregarCategoriaProjeto() {
    $().SPServices({
        operation: "GetList",
        listName: "Agendamentos",
        completefunc: function (Data, Status) {
            if (Status == 'success') {
                $(Data.responseXML).find('Field[DisplayName="Categoria do projeto"] CHOICE').each(function () {
                    $('select#categoriaDoProjeto').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
                });
            }
        }
    });
};

function CarregarLinhasDoProduto() {
    $().SPServices({
        operation: "GetList",
        listName: "Agendamentos",
        completefunc: function (Data, Status) {
            if (Status == 'success') {
                $(Data.responseXML).find('Field[DisplayName="Linha do produto"] CHOICE').each(function () {
                    $('select#linhaDoProduto').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
                });
            }
        }
    });
};

$(document).ready(function () {
    CarregarLinhasDoProduto();
    CarregarCategoriaProjeto();

    $("#tabs").tabs();
    $("#agendamentoDataInicioProgramado").datepicker();
    $("#produtoControlResponsavelAmostra").hide();
    $("#produtoControlQuantidadeAmostra").hide();
    $("#produtoResponsavelAmostra").text('');
    $("#produtoQuantidadeAmostra").text('');

    $("#produtoEnvioAmostras").change(function () {
        if (this.checked) {
            $("#produtoResponsavelAmostra").text('');
            $("#produtoQuantidadeAmostra").text('');
            $("#produtoControlResponsavelAmostra").show();
            $("#produtoControlQuantidadeAmostra").show();
        } else {
            $("#produtoControlResponsavelAmostra").hide();
            $("#produtoControlQuantidadeAmostra").hide();
        }
    });

    $('#tabsResponsaveis').tabs();
    $('#tabsAcompanhamento').tabs();

    $('#tipoDeLote').change(function () {
        $('#tabsResponsaveis').show();
        $('#tabsResponsaveis ul:first li').hide();
        $('#tabsAcompanhamento').show();
        $('#tabsAcompanhamento ul:first li').hide();

        switch (this.value) {
            case 'Brinde':
                $('li a[href="#tab-RespDLPCL"]').parent().show();
                $('li a[href="#tab-RespQual"]').parent().show();

                $('li a[href="#tab-AcompEngEnv"]').parent().show();
                $('li a[href="#tab-AcompEngFab"]').parent().show();
                $('li a[href="#tab-AcompInvDE"]').parent().show();
                $('li a[href="#tab-AcompInvDF"]').parent().show();
                $('li a[href="#tab-AcompFab"]').parent().show();
                $('li a[href="#tab-AcompMeioAmb"]').parent().show();
                break;
            case 'Envase':
                $('li a[href="#tab-RespDLPCL"]').parent().show();
                $('li a[href="#tab-RespEngEnv"]').parent().show();
                $('li a[href="#tab-RespInvDF"]').parent().show();
                $('li a[href="#tab-RespQual"]').parent().show();
                $('li a[href="#tab-RespFab"]').parent().show();

                $('li a[href="#tab-AcompInvDE"]').parent().show();
                $('li a[href="#tab-AcompEngFab"]').parent().show();
                $('li a[href="#tab-AcompMeioAmb"]').parent().show();
                break;
            case 'Fabricação':
                $('li a[href="#tab-RespDLPCL"]').parent().show();
                $('li a[href="#tab-RespEngFab"]').parent().show();
                $('li a[href="#tab-RespInvDF"]').parent().show();
                $('li a[href="#tab-RespQual"]').parent().show();
                $('li a[href="#tab-RespFab"]').parent().show();

                $('li a[href="#tab-AcompEngEnv"]').parent().show();
                $('li a[href="#tab-AcompInvDE"]').parent().show();
                $('li a[href="#tab-AcompMeioAmb"]').parent().show();
                break;
            case 'Picking':
                $('#tabsResponsaveis').hide();
                $('#tabsAcompanhamento').hide();
                break;
        }
    });

    $('#tipoDeLote').change();
});