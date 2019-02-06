'use strict';

var RASCUNHO = 'Rascunho';
var AGENDADO = 'Agendado';
var REGISTRO_DE_ANALISE = 'Registro das Análises';
var CANCELADO = 'Cancelado';
var APROVADO = 'Aprovado';
var REPROVADO = 'Reprovado';
var LOTE_NAO_EXECUTADO = 'Lote Não Executado';

var EM_CRIACAO = 'emCriacao';
var RASCUNHO_EM_EDICAO = 'rascunhoEmEdicao';
var AGENDAMENTO_EM_EDICAO = 'agendadoEmEdicao';
var RESP_ACOMP_AGENDADO_EM_EDICAO = 'respAcompAgendadoEmEdicao';
var EM_CANCELAMENTO = 'emCancelamento';
var EM_NAO_EXECUCAO = 'emNaoExecucao';
var EM_REGISTRO_DE_ANALISE = 'emRegistroDeAnalise';

var state;
var aprovacoes = {};
var $historicoIframe;

function ValidarAgendamentosGeral() {
    var errorAgendamentosGeral = 0;
    LimparValidacoes();
    if ($('select#tipoDeLote').children('option:selected').val() === 'Selecione uma opção') {
        errorAgendamentosGeral++;
        NotificarErroValidacao('select', 'select#tipoDeLote', '', '');
    }
    else {
        LimparValidacao('select', 'select#tipoDeLote', '');
    }

    if ($('select#fabrica').children('option:selected').val() === 'Selecione uma opção') {
        errorAgendamentosGeral++;
        NotificarErroValidacao('select', 'select#fabrica', '', '');
    }
    else {
        LimparValidacao('select', 'select#fabrica', '');
    }

    if ($('select#linhaEquipamento').children('option:selected').val() === 'Selecione uma opção') {
        errorAgendamentosGeral++;
        NotificarErroValidacao('select', 'select#linhaEquipamento', '', '');
    }
    else {
        LimparValidacao('select', 'select#linhaEquipamento', '');
    }

    return errorAgendamentosGeral;
}

function ValidarAgendamentosProduto() {
    var errorAgendamentosProduto = 0;
    LimparValidacoes();
    if ($('input#codigoProduto').val() === null || $('input#codigoProduto').val() == '') {
        errorAgendamentosProduto++;
        NotificarErroValidacao('text', 'input#codigoProduto', '', '');
    }
    else {
        LimparValidacao('text', 'input#codigoProduto', '');
    }

    if ($('select#linhaDoProduto').children('option:selected').val() === 'Selecione uma opção') {
        errorAgendamentosProduto++;
        NotificarErroValidacao('select', 'select#linhaDoProduto', '', '');
    }
    else {
        LimparValidacao('select', 'select#linhaDoProduto', '');
    }

    if ($('textarea#produtoDescricao').val() === null || $('textarea#produtoDescricao').val() == '') {
        errorAgendamentosProduto++;
        NotificarErroValidacao('text', 'textarea#produtoDescricao', '', '');
    }
    else {
        LimparValidacao('text', 'textarea#produtoDescricao', '');
    }

    if ($('input#produtoProjeto').val() === null || $('input#produtoProjeto').val() == '') {
        errorAgendamentosProduto++;
        NotificarErroValidacao('text', 'input#produtoProjeto', '', '');
    }
    else {
        LimparValidacao('text', 'input#produtoProjeto', '');
    }

    if ($('select#categoriaDoProjeto').children('option:selected').val() === 'Selecione uma opção') {
        errorAgendamentosProduto++;
        NotificarErroValidacao('select', 'select#categoriaDoProjeto', '', '');
    }
    else {
        LimparValidacao('select', 'select#categoriaDoProjeto', '');
    }

    if ($('input#produtoFormula').val() === null || $('input#produtoFormula').val() == '') {
        errorAgendamentosProduto++;
        NotificarErroValidacao('text', 'input#produtoFormula', '', '');
    }
    else {
        LimparValidacao('text', 'input#produtoFormula', '');
    }


    if ($('input#produtoQuantidade').val() === null || $('input#produtoQuantidade').val() == '') {
        errorAgendamentosProduto++;
        NotificarErroValidacao('text', 'input#produtoQuantidade', '', '');
    }
    else {
        LimparValidacao('text', 'input#produtoQuantidade', '');
    }

    if ($('select#motivo').children('option:selected').val() === 'Selecione uma opção') {
        errorAgendamentosProduto++;
        NotificarErroValidacao('select', 'select#motivo', '', '');
    }
    else {
        LimparValidacao('select', 'select#motivo', '');
    }
    // if ($("input[type=checkbox]#produtoEnvioAmostras").prop('checked')) {
    //     if ($('input#produtoResponsavelAmostra').val() === null || $('input#produtoResponsavelAmostra').val()=='') {
    //         errorAgendamentosProduto++;
    //         NotificarErroValidacao('text', 'input#produtoResponsavelAmostra', '', '');
    //     }
    //     else {
    //         LimparValidacao('text', 'input#produtoResponsavelAmostra', '');
    //     }

    //     if ($('input#produtoQuantidadeAmostra').val() === null || $('input#produtoQuantidadeAmostra').val()=='') {
    //         errorAgendamentosProduto++;
    //         NotificarErroValidacao('text', 'input#produtoQuantidadeAmostra', '', '');
    //     }
    //     else {
    //         LimparValidacao('text', 'input#produtoQuantidadeAmostra', '');
    //     }
    // }
    // else {
    //     LimparValidacao('text', 'input#produtoResponsavelAmostra', '');
    //     LimparValidacao('text', 'input#produtoResponsavelAmostra', '');
    // }

    return errorAgendamentosProduto;
}

function ValidarAgendamentosAgendamento() {
    var errorAgendamentosAgendamento = 0;
    LimparValidacoes();
    if ($('input#agendamentoCentroCusto').val() === null || $('input#agendamentoCentroCusto').val() == '') {
        errorAgendamentosAgendamento++;
        NotificarErroValidacao('text', 'input#agendamentoCentroCusto', '', '');
    }
    else {
        LimparValidacao('text', 'input#agendamentoCentroCusto', '');
    }

    if (!$('select#grauComplexidade').children('option:selected').val() || $('select#grauComplexidade').children('option:selected').val() === 'Selecione uma opção') {
        errorAgendamentosAgendamento++;
        NotificarErroValidacao('select', 'select#grauComplexidade', '', '');
    }
    else {
        LimparValidacao('select', 'select#grauComplexidade', '');
    }

    if ($('input#agendamentoDataInicioProgramado').val() === null || $('input#agendamentoDataInicioProgramado').val() == '') {
        errorAgendamentosAgendamento++;
        $('input#agendamentoDataInicioProgramado').attr("title", "Data não pode ser inválida.");
        NotificarErroValidacao('text', 'input#agendamentoDataInicioProgramado', '', '');
    }
    else {
        var SelectedDate = new Date($('input#agendamentoDataInicioProgramado').val().substring(6, 10), $('input#agendamentoDataInicioProgramado').val().substring(3, 5) - 1, $('input#agendamentoDataInicioProgramado').val().substring(0, 2));
        var CurrentDateTime = new Date();
        var CurrentDate = new Date(CurrentDateTime.getFullYear(), CurrentDateTime.getMonth(), CurrentDateTime.getDate());

        if (CurrentDate > SelectedDate) {
            errorAgendamentosAgendamento++;
             $('input#agendamentoDataInicioProgramado').attr("title", "Data não pode ser menor do que a atual.");
            NotificarErroValidacao('text', 'input#agendamentoDataInicioProgramado', '', '');
        }
        else {
            $('input#agendamentoDataInicioProgramado').removeAttr("title");
            LimparValidacao('text', 'input#agendamentoDataInicioProgramado', '');
        }
    }

    if ($('input#agendamentoDuracaoHoras').val() === null || $('input#agendamentoDuracaoHoras').val() == '') {
        errorAgendamentosAgendamento++;
        NotificarErroValidacao('text', 'input#agendamentoDuracaoHoras', '', '');
    }
    else {
        if ($('input#agendamentoDuracaoHoras').val() < 0 || $('input#agendamentoDuracaoHoras').val() > 24) {
            errorAgendamentosAgendamento++;
            NotificarErroValidacao('text', 'input#agendamentoDuracaoHoras', '', '');
        }
        else {
            LimparValidacao('text', 'input#agendamentoDuracaoHoras', '');
        }
    }

    if ($('input#agendamentoDuracaoMinutos').val() === null || $('input#agendamentoDuracaoMinutos').val() == '') {
        errorAgendamentosAgendamento++;
        NotificarErroValidacao('text', 'input#agendamentoDuracaoMinutos', '', '');
    }
    else {
        if ($('input#agendamentoDuracaoMinutos').val() < 0 || $('input#agendamentoDuracaoMinutos').val() > 59) {
            errorAgendamentosAgendamento++;
            NotificarErroValidacao('text', 'input#agendamentoDuracaoMinutos', '', '');
        }
        else {
            LimparValidacao('text', 'input#agendamentoDuracaoMinutos', '');
        }
    }

    // if ($('textarea#agendamentoObservacoes').val() === null || $('textarea#agendamentoObservacoes').val() == '') {
    //     errorAgendamentosAgendamento++;
    //     NotificarErroValidacao('text', 'textarea#agendamentoObservacoes', '', '');
    // }
    // else {
    //     LimparValidacao('text', 'textarea#agendamentoObservacoes', '');
    // }

    return errorAgendamentosAgendamento;
}

function ValidarAgendamentosResponsaveisBrinde() {
    var errorAgendamentosResponsaveisBrinde = 0;

    //DL/PCL - Responsável
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespDLPCL_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisBrinde++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespDLPCL', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespDLPCL_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespDLPCL', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespRespDLPCL', '');
        }
    }

    //Qualidade - Responsável
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespQualidade_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisBrinde++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespQualidade', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespQualidade_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespQualidade', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespRespQualidade', '');
        }
    }

    //Qualidade - Gerente
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerQualidade_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisBrinde++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerQualidade', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerQualidade_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerQualidade', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespGerQualidade', '');
        }
    }

    return errorAgendamentosResponsaveisBrinde;
}

function ValidarAgendamentosResponsaveisEnvase() {
    var errorAgendamentosResponsaveisEnvase = 0;

    //DL/PCL - Responsável
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespDLPCL_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisEnvase++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespDLPCL', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespDLPCL_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespDLPCL', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespRespDLPCL', '');
        }
    }

    //Eng. Envase - Responsável
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespEngEnvase_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisEnvase++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespEngEnvase', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespEngEnvase_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespEngEnvase', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespRespEngEnvase', '');
        }
    }

    //Eng. Envase - Gerente
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerEngEnvase_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisEnvase++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerEngEnvase', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerEngEnvase_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerEngEnvase', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespGerEngEnvase', '');
        }
    }

    //Qualidade - Responsável
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespQualidade_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisEnvase++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespQualidade', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespQualidade_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespQualidade', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespRespQualidade', '');
        }
    }

    //Qualidade - Gerente
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerQualidade_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisEnvase++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerQualidade', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerQualidade_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerQualidade', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespGerQualidade', '');
        }
    }

    //InovDE - Responsável
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespInovDE_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisEnvase++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespInovDE', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespInovDE_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespInovDE', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespRespInovDE', '');
        }
    }

    //InovDE - Gerente
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerInovDE_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisEnvase++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerInovDE', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerInovDE_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerInovDE', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespGerInovDE', '');
        }
    }

    //Fábrica - Coordenador de Programação
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespCoordProgFabrica_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisEnvase++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespCoordProgFabrica', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespCoordProgFabrica_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespCoordProgFabrica', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespCoordProgFabrica', '');
        }
    }

    //Fábrica - Coordenador de Manufatura
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespCoordManFabrica_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisEnvase++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespCoordManFabrica', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespCoordManFabrica_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespCoordManFabrica', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespCoordManFabrica', '');
        }
    }

    //Fábrica - Gerente
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerFabrica_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisEnvase++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerFabrica', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerFabrica_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerFabrica', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespGerFabrica', '');
        }
    }

    return errorAgendamentosResponsaveisEnvase;
}

function ValidarAgendamentosResponsaveisFabricacao() {
    var errorAgendamentosResponsaveisFabricacao = 0;

    //DL/PCL - Responsável
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespDLPCL_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisFabricacao++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespDLPCL', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespDLPCL_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespDLPCL', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespRespDLPCL', '');
        }
    }

    //Qualidade - Responsável
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespQualidade_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisFabricacao++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespQualidade', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespQualidade_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespQualidade', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespRespQualidade', '');
        }
    }

    //Qualidade - Gerente
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerQualidade_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisFabricacao++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerQualidade', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerQualidade_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerQualidade', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespGerQualidade', '');
        }
    }

    //Eng. Fabricação - Responsável
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespEngFabricacao_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisFabricacao++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespEngFabricacao', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespEngFabricacao_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespEngFabricacao', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespRespEngFabricacao', '');
        }
    }

    //Eng. Fabricação - Gerente
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerEngFabricacao_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisFabricacao++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerEngFabricacao', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerEngFabricacao_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerEngFabricacao', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespGerEngFabricacao', '');
        }
    }

    //Inov DF - Responsável
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespInovDF_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisFabricacao++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespInovDF', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespInovDF_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespRespInovDF', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespRespInovDF', '');
        }
    }

    //Inov DF - Gerente
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerInovDF_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisFabricacao++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerInovDF', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerInovDF_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerInovDF', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespGerInovDF', '');
        }
    }

    //Fábrica - Coordenador de Programação
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespCoordProgFabrica_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisFabricacao++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespCoordProgFabrica', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespCoordProgFabrica_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespCoordProgFabrica', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespCoordProgFabrica', '');
        }
    }

    //Fábrica - Coordenador de Manufatura
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespCoordManFabrica_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisFabricacao++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespCoordManFabrica', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespCoordManFabrica_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespCoordManFabrica', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespCoordManFabrica', '');
        }
    }

    //Fábrica - Gerente
    if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerFabrica_TopSpan.HasResolvedUsers()) {
        errorAgendamentosResponsaveisFabricacao++;
        NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerFabrica', '', '');
    }
    else {
        if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespGerFabrica_TopSpan.HasInputError) {
            errorAgendamentosResponsaveisFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaRespGerFabrica', '', '');
        }
        else {
            LimparValidacao('people', 'div#peoplePickerAbaRespGerFabrica', '');
        }
    }

    return errorAgendamentosResponsaveisFabricacao;
}

function ValidarAgendamentosResponsaveisPicking() {
    var errorAgendamentosResponsaveisPicking = 0;
    LimparValidacao('people', 'div#peoplePickerAbaRespRespDLPCL', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespRespEngEnvase', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespGerEngEnvase', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespRespEngFabricacao', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespGerEngFabricacao', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespRespInovDF', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespGerInovDF', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespRespInovDE', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespGerInovDE', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespRespQualidade', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespGerQualidade', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespCoordProgFabrica', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespCoordManFabrica', '');
    LimparValidacao('people', 'div#peoplePickerAbaRespGerFabrica', '');
    return errorAgendamentosResponsaveisPicking;
}

function ValidarAgendamentosResponsaveis(tipoDeLote) {
    var errorAgendamentosResponsaveis = 0;
    switch (tipoDeLote) {
        case 'Brinde': {
            errorAgendamentosResponsaveis = ValidarAgendamentosResponsaveisBrinde();
            break;
        }
        case 'Envase': {
            errorAgendamentosResponsaveis = ValidarAgendamentosResponsaveisEnvase();
            break;
        }
        case 'Fabricação': {
            errorAgendamentosResponsaveis = ValidarAgendamentosResponsaveisFabricacao();
            break;
        }
        case 'Picking': {
            errorAgendamentosResponsaveis = ValidarAgendamentosResponsaveisPicking();
            return errorAgendamentosResponsaveis;
        }
        default: {
            return errorAgendamentosResponsaveis;
        }
    }

    return errorAgendamentosResponsaveis;
}

function ValidarAgendamentosAcompanhamentosBrinde() {
    var errorAgendamentosAcompanhamentosBrinde = 0;

    //Eng. Envase
    if ($("input[type=checkbox]#produtoEnvioAmostras").prop('checked')) {
        //Engenharia Evase - Responsável
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespEngEnvase_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespEngEnvase', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespEngEnvase_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosBrinde++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespEngEnvase', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcRespEngEnvase', '');
            }
        }

        //Engenharia Evase - Gerente
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerEngEnvase_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerEngEnvase', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerEngEnvase_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosBrinde++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerEngEnvase', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcGerEngEnvase', '');
            }
        }
    }
    else {
        LimparValidacao('people', 'div#peoplePickerAbaAcRespEngEnvase', '');
        LimparValidacao('people', 'div#peoplePickerAbaAcGerEngEnvase', '');
    }


    //Eng. Fabricação
    if ($("input[type=checkbox]#acRespEngFabricacaoAcomp").prop('checked')) {
        //Engenharia Fabricação - Responsável
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespEngFabricacao_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespEngFabricacao', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespEngFabricacao_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosBrinde++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespEngFabricacao', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcRespEngFabricacao', '');
            }
        }

        //Engenharia Fabricação - Gerente
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerEngFabricacao_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerEngFabricacao', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerEngFabricacao_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosBrinde++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerEngFabricacao', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcGerEngFabricacao', '');
            }
        }
    }
    else {
        LimparValidacao('people', 'div#peoplePickerAbaAcRespEngFabricacao', '');
        LimparValidacao('people', 'div#peoplePickerAbaAcGerEngFabricacao', '');
    }

    //Inov. DF
    if ($("input[type=checkbox]#acRespInovDFAcomp").prop('checked')) {
        //Inovação DF - Responsável
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespInovDF_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespInovDF', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespInovDF_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosBrinde++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespInovDF', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcRespInovDF', '');
            }
        }

        //Inovação DF - Gerente
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerInovDF_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerInovDF', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerInovDF_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosBrinde++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerInovDF', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcGerInovDF', '');
            }
        }
    }
    else {
        LimparValidacao('people', 'div#peoplePickerAbaAcRespInovDF', '');
        LimparValidacao('people', 'div#peoplePickerAbaAcGerInovDF', '');
    }

    //Inov. DE
    if ($("input[type=checkbox]#acRespInovDEAcomp").prop('checked')) {
        //Inovação DE - Responsável
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespInovDE_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespInovDE', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespInovDE_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosBrinde++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespInovDE', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcRespInovDE', '');
            }
        }

        //Inovação DE - Gerente
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerInovDE_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerInovDE', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerInovDE_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosBrinde++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerInovDE', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcGerInovDE', '');
            }
        }
    }
    else {
        LimparValidacao('people', 'div#peoplePickerAbaAcRespInovDE', '');
        LimparValidacao('people', 'div#peoplePickerAbaAcGerInovDE', '');
    }

    //Fábrica
    if ($("input[type=checkbox]#acRespInovDFAcomp").prop('checked')) {
        //Fábrica - Coordenador de Programação
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcCoordProgFabrica_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcCoordProgFabrica', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcCoordProgFabrica_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosBrinde++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcCoordProgFabrica', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcCoordProgFabrica', '');
            }
        }

        //Fábrica - Coordenador de Manufatura
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcCoordManFabrica_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcCoordManFabrica', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcCoordManFabrica_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosBrinde++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcCoordManFabrica', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcCoordManFabrica', '');
            }
        }

        //Fábrica - Gerente
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerFabrica_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosBrinde++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerFabrica', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerFabrica_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosBrinde++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerFabrica', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcGerFabrica', '');
            }
        }
    }
    else {
        LimparValidacao('people', 'div#peoplePickerAbaAcCoordProgFabrica', '');
        LimparValidacao('people', 'div#peoplePickerAbaAcCoordManFabrica', '');
        LimparValidacao('people', 'div#peoplePickerAbaAcGerFabrica', '');
    }

    return errorAgendamentosAcompanhamentosBrinde;
}

function ValidarAgendamentosAcompanhamentosEnvase() {
    var errorAgendamentosAcompanhamentosEnvase = 0;

    //Eng. Fabricação
    if ($("input[type=checkbox]#acRespEngFabricacaoAcomp").prop('checked')) {
        //Engenharia Fabricação - Responsável
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespEngFabricacao_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespEngFabricacao', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespEngFabricacao_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosEnvase++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespEngFabricacao', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcRespEngFabricacao', '');
            }
        }

        //Engenharia Fabricação - Gerente
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerEngFabricacao_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerEngFabricacao', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerEngFabricacao_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosEnvase++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerEngFabricacao', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcGerEngFabricacao', '');
            }
        }
    }
    else {
        LimparValidacao('people', 'div#peoplePickerAbaAcRespEngFabricacao', '');
        LimparValidacao('people', 'div#peoplePickerAbaAcGerEngFabricacao', '');
    }

    //Meio Ambiente
    if ($("input[type=checkbox]#acRespMeioAmbienteAcomp").prop('checked')) {
        //Meio Ambiente - Responsável
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespMeioAmbiente_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosEnvase++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespMeioAmbiente', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespMeioAmbiente_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosEnvase++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespMeioAmbiente', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcRespMeioAmbiente', '');
            }
        }
    }
    else {
        LimparValidacao('people', 'div#peoplePickerAbaAcRespMeioAmbiente', '');
    }

    return errorAgendamentosAcompanhamentosEnvase;
}

function ValidarAgendamentosAcompanhamentosFabricacao() {
    var errorAgendamentosAcompanhamentosFabricacao = 0;

    //Eng. Envase
    if ($("input[type=checkbox]#acRespEngEnvaseAcomp").prop('checked')) {
        //Engenharia Evase - Responsável
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespEngEnvase_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespEngEnvase', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespEngEnvase_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosFabricacao++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespEngEnvase', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcRespEngEnvase', '');
            }
        }

        //Engenharia Evase - Gerente
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerEngEnvase_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerEngEnvase', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerEngEnvase_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosFabricacao++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerEngEnvase', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcGerEngEnvase', '');
            }
        }
    }
    else {
        LimparValidacao('people', 'div#peoplePickerAbaAcRespEngEnvase', '');
        LimparValidacao('people', 'div#peoplePickerAbaAcGerEngEnvase', '');
    }

    //Inov. DE
    if ($("input[type=checkbox]#acRespInovDEAcomp").prop('checked')) {
        //Inovação DE - Responsável
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespInovDE_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespInovDE', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespInovDE_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosFabricacao++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespInovDE', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcRespInovDE', '');
            }
        }

        //Inovação DE - Gerente
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerInovDE_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerInovDE', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcGerInovDE_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosFabricacao++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcGerInovDE', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcGerInovDE', '');
            }
        }
    }
    else {
        LimparValidacao('people', 'div#peoplePickerAbaAcRespInovDE', '');
        LimparValidacao('people', 'div#peoplePickerAbaAcGerInovDE', '');
    }

    //Meio Ambiente
    if ($("input[type=checkbox]#acRespMeioAmbienteAcomp").prop('checked')) {
        //Meio Ambiente - Responsável
        if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespMeioAmbiente_TopSpan.HasResolvedUsers()) {
            errorAgendamentosAcompanhamentosFabricacao++;
            NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespMeioAmbiente', '', '');
        }
        else {
            if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaAcRespMeioAmbiente_TopSpan.HasInputError) {
                errorAgendamentosAcompanhamentosFabricacao++;
                NotificarErroValidacao('people', 'div#peoplePickerAbaAcRespMeioAmbiente', '', '');
            }
            else {
                LimparValidacao('people', 'div#peoplePickerAbaAcRespMeioAmbiente', '');
            }
        }
    }
    else {
        LimparValidacao('people', 'div#peoplePickerAbaAcRespMeioAmbiente', '');
    }

    return errorAgendamentosAcompanhamentosFabricacao;
}

function ValidarAgendamentosAcompanhamentosPicking() {
    var errorAgendamentosAcompanhamentosPicking = 0;

    LimparValidacao('people', 'div#peoplePickerAbaAcRespEngFabricacao', '');
    LimparValidacao('people', 'div#peoplePickerAbaAcGerEngFabricacao', '');
    LimparValidacao('people', 'div#peoplePickerAbaAcRespInovDF', '');
    LimparValidacao('people', 'div#peoplePickerAbaAcGerInovDF', '');
    LimparValidacao('people', 'div#peoplePickerAbaAcRespEngEnvase', '');
    LimparValidacao('people', 'div#peoplePickerAbaAcGerEngEnvase', '');
    LimparValidacao('people', 'div#peoplePickerAbaAcRespInovDE', '');
    LimparValidacao('people', 'div#peoplePickerAbaAcGerInovDE', '');
    LimparValidacao('people', 'div#peoplePickerAbaAcCoordProgFabrica', '');
    LimparValidacao('people', 'div#peoplePickerAbaAcCoordManFabrica', '');
    LimparValidacao('people', 'div#peoplePickerAbaAcGerFabrica', '');
    LimparValidacao('people', 'div#peoplePickerAbaAcRespMeioAmbiente', '');

    return errorAgendamentosAcompanhamentosPicking;
}

function ValidarAgendamentosAcompanhamentos(tipoDeLote) {
    var errorAgendamentosAcompanhamentos = 0;
    switch (tipoDeLote) {
        case 'Brinde': {
            errorAgendamentosAcompanhamentos = ValidarAgendamentosAcompanhamentosBrinde();
            break;
        }
        case 'Envase': {
            errorAgendamentosAcompanhamentos = ValidarAgendamentosAcompanhamentosEnvase();
            break;
        }
        case 'Fabricação': {
            errorAgendamentosAcompanhamentos = ValidarAgendamentosAcompanhamentosFabricacao();
            break;
        }
        case 'Picking': {
            errorAgendamentosAcompanhamentos = ValidarAgendamentosAcompanhamentosPicking();
            return errorAgendamentosAcompanhamentos;
        }
        default: {
            return errorAgendamentosAcompanhamentos;
        }
    }

    return errorAgendamentosAcompanhamentos;
}

function ValidarStatusECamposObrigatorios() {
    var erros = 0;
    switch (state) {
        case EM_CANCELAMENTO:
            if ($('select#canceladoMotivo').children('option:selected').val() === 'Selecione uma opção') {
                erros++;
                NotificarErroValidacao('select', 'select#canceladoMotivo', '', '');
            }
            break;
        case EM_NAO_EXECUCAO:
            if ($('select#naoExecutadoMotivo').children('option:selected').val() === 'Selecione uma opção') {
                erros++;
                NotificarErroValidacao('select', 'select#naoExecutadoMotivo', '', '');
            }
            break;
        case EM_REGISTRO_DE_ANALISE:
            Object.keys(aprovacoes).forEach(function (index) {
                var aprovacao = aprovacoes[index];

                if (aprovacao._abaAnaliseId != null) {
                    var $abaAnalise = $('#' + aprovacao._abaAnaliseId);
                    if (CarregarUsuarioAtual().id == FiltrarIdPorPessoaId(aprovacao.Pessoa)) {
                        var resultado = $abaAnalise.find('[name=Resultado]');

                        var reprovadoMotivo = $abaAnalise.find('[name=ReprovadoMotivo]');
                        if (resultado.children('option:selected').val() === 'Reprovado'
                            && reprovadoMotivo.children('option:selected').val() === 'Selecione uma opção') {
                            erros++;
                            NotificarErroValidacao('name', reprovadoMotivo, '', '');
                        }
                    }
                }
            });
            break;
    }
    if (erros > 0) {
        return false;
    }
    else {
        return true;
    }
}

function ValidarAgendamento() {
    verificarErros();

    var erroTotal = 0;
    var errosPnlGeral = ValidarAgendamentosGeral();
    var errosAbaProduto = ValidarAgendamentosProduto();
    var errorAbaAgendamento = ValidarAgendamentosAgendamento();

    var errorAgendamentosResponsaveis = ValidarAgendamentosResponsaveis($("select#tipoDeLote").val());
    var errorAgendamentosAcompanhamentos = ValidarAgendamentosAcompanhamentos($("select#tipoDeLote").val());

    erroTotal = errosPnlGeral + errosAbaProduto + errorAbaAgendamento + errorAgendamentosResponsaveis; //+ errorAgendamentosAcompanhamentos;

    if (erroTotal > 0) {
        return false;
    }
    else {
        return true;
    }
}

function LimparValidacao(controlType, control, controlValidator) {
    switch (controlType) {
        case 'select':
            {
                $(control).css({
                    "border-color": "",
                    "-webkit-box-shadow": "",
                    "box-shadow": ""
                });
                $(controlValidator).hide();
                break;
            }
        case 'text':
            {
                $(control).css({
                    "border-color": "",
                    "-webkit-box-shadow": "",
                    "box-shadow": ""
                });
                $(controlValidator).hide();
                break;
            }
        case 'people':
            {
                $(control).css({
                    "border": "",
                    "-webkit-box-shadow": "",
                    "box-shadow": ""
                });
                $(controlValidator).hide();
                break;
            }
    }
}

function NotificarErroValidacao(controlType, control, controlValidator, message) {
    switch (controlType) {
        case 'select':
            {
                $(control).css({
                    "border-color": "#a94442",
                    "-webkit-box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)",
                    "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"
                });
                break;
            }
        case 'text':
            {
                $(control).css({
                    "border-color": "#a94442",
                    "-webkit-box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)",
                    "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"

                });
                break;
            }
        case 'people':
            {
                $(control).css({
                    "border": "1px solid #a94442",
                    "-webkit-box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)",
                    "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"
                });
                break;
            }
        case 'name':
            control.css({
                "border-color": "#a94442",
                "-webkit-box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)",
                "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"
            });
    }
}

function LimparValidacoes() {
}

function AddAttachments(listName, itemId, controlName) {
    var $promise = $.Deferred();

    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/contextinfo",
        method: "POST",
        headers: {
            "ACCEPT": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose"
        },
        success: function (data) {
            $promise.resolve(data.d.GetContextWebInformation.FormDigestValue);
        },
        error: $promise.reject
    });

    return $promise.then(function (digest) {
        return UploadAnexo(digest, listName, itemId, controlName).then(function () {
            controlName.value = '';
            CarregarPaineisDeAnexos();
        }).fail(function (error) {
            alert(error.errorMessage);
        })
    });
}

function UploadAnexo(digest, listName, itemId, controlName) {
    var $promise = $.Deferred();
    var fileInput = $(controlName);
    var fileName = fileInput[0].files[0].name;
    var reader = new FileReader();

    reader.onload = function (e) {
        var fileData = e.target.result;

        if (fileData.byteLength == 0) {
            return $promise.reject({
                errorCode: '0x2147024883',
                errorMessage: 'Não é possível carregar arquivos vazios. Tente novamente'
            });
        }

        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + itemId + ")/AttachmentFiles/add(FileName='" + fileName + "')",
            method: "POST",
            binaryStringRequestBody: true,
            data: fileData,
            processData: false,
            headers: {
                "ACCEPT": "application/json;odata=verbose",
                "X-RequestDigest": digest,
                "Content-Length": fileData.byteLength
            },
            success: $promise.resolve,
            error: function (data) {
                $promise.reject({
                    errorCode: data.errorCode,
                    errorMessage: data.error.message.value
                });
            }
        });
    };

    reader.readAsArrayBuffer(fileInput[0].files[0]);

    return $promise;
}

// Query the picker for user information.
function getUserInfo() {

    // Get the people picker object from the page.
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;

    // Get information about all users.
    var users = peoplePicker.GetAllUserInfo();
    var userInfo = '';
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        for (var userProperty in user) {
            userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
        }
    }
    $('#resolvedUsers').html(userInfo);

    // Get user keys.
    var keys = peoplePicker.GetAllUserKeys();
    $('#userKeys').html(keys);

    // Get the first user's ID by using the login name.
    getUserId(users[0].Key);
}

// Get the user ID.
function getUserId(loginName) {
    var context = new SP.ClientContext.get_current();
    this.user = context.get_web().ensureUser(loginName);
    context.load(this.user);
    context.executeQueryAsync(
        Function.createDelegate(null, ensureUserSuccess),
        Function.createDelegate(null, onFail)
    );
}

function ensureUserSuccess() {
    $('#userId').html(this.user.get_id());
}

function onFail(sender, args) {
    alert('Query failed. Error: ' + args.get_message());
}

function AtributoNumber(number) {
    return number | 0;
}

function AtualizarAgendamento(id) {
    var $promise = $.Deferred();
    CalcularCamposCalculaveis();
    ModificarStatusPorFormState(state);
    var campos = [];

    $('#main [name].salvar-campo').each(function () {
        var $this = $(this);

        if ($this.is('[type=checkbox]')) {
            campos.push([this.name, $this.prop('checked') ? "1" : "0"]);
        } else if ($this.is('.date-time-picker')) {
            campos.push([this.name, moment($this.val(), 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm:ss[-00:00]')]);
        } else if ($this.val() != undefined) {
            campos.push([this.name, $this.val()]);
        }
    });

    var $registroAnalisesInicio = $('[name=RegistroAnalisesInicio]');
    if (!$registroAnalisesInicio.val() && state == REGISTRO_DE_ANALISE) {
        campos.push([$registroAnalisesInicio.attr('name'), moment(new Date(), 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm:ss[-00:00]')]);
    }

    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "Update",
        listName: "Agendamentos",
        ID: id,
        valuepairs: campos,
        completefunc: function (xData, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            var $response = $(xData.responseText);
            var errorCode = $response.find('ErrorCode').text();

            if (errorCode == '0x00000000') {
                $promise.resolve({
                    record: $response.find('z\\:row:first')
                });
            } else {
                $promise.reject({
                    errorCode: errorCode,
                    errorText: $response.find('ErrorText').text()
                });
            }
        }
    });

    return $promise.then(function (response) {
        let $TipoLote = $('[name=TipoLote]');
        let promises = [];
        let responsaveis = GetResponsaveisPorTipoDeLote($TipoLote.val());

        $.each(responsaveis, function (i, responsavel) {
            var usuarioDoPeoplePicker = PegarUsuarioDoPeoplePicker(responsavel.peoplePickerId);

            if (usuarioDoPeoplePicker) {
                promises.push(CarregarUsuarioPorLoginName(usuarioDoPeoplePicker.loginName).then(function (usuario) {
                    return AtualizarResponsavelAgendamento(response.record.attr('ows_CodigoAgendamento'), responsavel, usuario);
                }));
            }
        });

        return $.when.apply($, promises).then(function () {
            return response;
        });
    });
}

function CarregarStatusAgendamentoPorCodigoAgendamento(id) {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetListItems',
        listName: 'Agendamentos',
        CAMLQuery: '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Number">' + id + '</Value></Eq></Where></Query>',
        CAMLViewFields: '<ViewFields><FieldRef Name="Status" /></ViewFields>',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            var $registro = $(Data.responseText).find('z\\:row:first');

            if (!$registro.length) {
                $promise.reject({
                    errorCode: '0x99999998',
                    errorText: 'Registro não encontrado'
                });

                return;
            }

            $promise.resolve($registro.get(0).attributes.ows_Status.value);
        }
    });

    return $promise;
}

function ReprovarAgendamentoPorCodigoAgendamento(id) {
    var $promise = $.Deferred();

    $().SPServices({
        operation: "UpdateListItems",
        batchCmd: "Update",
        listName: "Agendamentos",
        ID: id,
        valuepairs: [['Status', REPROVADO]],
        completefunc: function (xData, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            var $response = $(xData.responseText);
            var errorCode = $response.find('ErrorCode').text();

            if (errorCode == '0x00000000') {
                $('select#status').val(REPROVADO);
                $promise.resolve();
            } else {
                $promise.reject({
                    errorCode: errorCode,
                    errorText: $response.find('ErrorText').text()
                });
            }
        }
    });

    return $promise;
}

function AtualizarResponsavelAgendamento(codigoAgendamento, responsavel, usuario) {
    if (aprovacoes[responsavel.nome] == null) {
        return InserirResponsavelAgendamento(codigoAgendamento, responsavel, usuario);
    }

    return AtualizarAprovacaoEmMemoria(responsavel).then(function (aprovacao) {
        var $promise = $.Deferred();
        var campos = [];

        Object.keys(aprovacao).forEach(function (index) {
            if (aprovacao[index] != null && !index.startsWith('_')) {
                campos.push([index, aprovacao[index]]);
            }
        });

        $().SPServices({
            operation: "UpdateListItems",
            async: false,
            batchCmd: "Update",
            listName: "Agendamentos - Responsáveis",
            ID: aprovacao.ID,
            valuepairs: campos,
            completefunc: function (xData, Status) {
                if (Status != 'success') {
                    $promise.reject({
                        errorCode: '0x99999999',
                        errorText: 'Erro Remoto'
                    });

                    return;
                }

                var $response = $(xData.responseText);
                var errorCode = $response.find('ErrorCode').text();

                if (errorCode == '0x00000000') {
                    var $record = $response.find('z\\:row:first');

                    if ($('select#status').val() == REGISTRO_DE_ANALISE && aprovacao.Resultado == 'Reprovado') {
                        CarregarStatusAgendamentoPorCodigoAgendamento($('input[name="ID"]').val()).then(function (status) {
                            if (status == REGISTRO_DE_ANALISE) {
                                ReprovarAgendamentoPorCodigoAgendamento($('input[name="ID"]').val()).then(function () {
                                    $promise.resolve({
                                        record: $record
                                    });
                                }).fail(function (error) {
                                    $promise.reject(error);
                                });
                            } else {
                                $promise.resolve({
                                    record: $record
                                });
                            }
                        });
                    } else {
                        $promise.resolve({
                            record: $record
                        });
                    }
                } else {
                    $promise.reject({
                        errorCode: errorCode,
                        errorText: $response.find('ErrorText').text()
                    });
                }
            }
        });

        return $promise;
    });
}

function CalcularCamposCalculaveis() {
    var $titulo = $('input[name=Title]');
    var $codigoProduto = $('input[name=CodigoProduto]');
    var $projeto = $('input[name=Projeto]');

    $titulo.val($codigoProduto.val() + ' - ' + $projeto.val());
}

function CarregarAgendamento(id) {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetListItems',
        listName: 'Agendamentos',
        CAMLQuery: '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Number">' + id + '</Value></Eq></Where></Query>',
        CAMLViewFields: '<ViewFields><FieldRef Name="Title" /><FieldRef Name="CodigoProduto" /><FieldRef Name="LinhaProduto" /><FieldRef Name="DescricaoProduto" /><FieldRef Name="Projeto" /><FieldRef Name="CategoriaProjeto" /><FieldRef Name="Motivo" /><FieldRef Name="TipoLote" /><FieldRef Name="QuantidadePecas" /><FieldRef Name="Formula" /><FieldRef Name="EnvioAmostras" /><FieldRef Name="ResponsavelAmostra" /><FieldRef Name="QuantidadeAmostra" /><FieldRef Name="InicioProgramado" /><FieldRef Name="DuracaoEstimadaHoras" /><FieldRef Name="DuracaoEstimadaMinutos" /><FieldRef Name="FimProgramado" /><FieldRef Name="Fabrica" /><FieldRef Name="LinhaEquipamento" /><FieldRef Name="CentroCusto" /><FieldRef Name="GrauComplexidade" /><FieldRef Name="MaoObra" /><FieldRef Name="Observacoes" /><FieldRef Name="Status" /><FieldRef Name="EngenhariaFabricacaoAcompanhamen" /><FieldRef Name="EngenhariaEnvaseAcompanhamento" /><FieldRef Name="InovacaoDfAcompanhamento" /><FieldRef Name="InovacaoDeAcompanhamento" /><FieldRef Name="QualidadeAcompanhamento" /><FieldRef Name="FabricaAcompanhamento" /><FieldRef Name="CodigoAgendamento" /><FieldRef Name="NaoExecutadoMotivo" /><FieldRef Name="NaoExecutadoComentarios" /><FieldRef Name="CanceladoMotivo" /><FieldRef Name="CanceladoComentarios" /><FieldRef Name="ReagendamentoContador" /><FieldRef Name="CalendarioTitulo" /><FieldRef Name="CalendarioSubtitulo" /><FieldRef Name="Executado" /><FieldRef Name="MeioAmbienteAcompanhamento" /><FieldRef Name="RegistroAnalisesInicio" /><FieldRef Name="Modified" /><FieldRef Name="Created" /><FieldRef Name="Author" /><FieldRef Name="Editor" /></ViewFields>',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            var $registro = $(Data.responseText).find('z\\:row:first');

            if (!$registro.length) {
                $promise.reject({
                    errorCode: '0x99999998',
                    errorText: 'Registro não encontrado'
                });

                return;
            }

            var atributos = $registro.get(0).attributes;
            var selectsACarregar = [];

            $.each(atributos, function () {
                if (this.value.startsWith('datetime;#')) {
                    this.value = this.value.slice('datetime;#'.length);
                }

                var $elemento = $('#main [name=' + this.name.substr(4) + ' i]');

                if ($elemento.is('[type=checkbox]')) {
                    $elemento.prop('checked', this.value == "1");
                    $elemento.change();
                } else if ($elemento.is('[type=number]')) {
                    $elemento.val(AtributoNumber(this.value));
                    $elemento.change();
                } else if ($elemento.is('.date-time-picker')) {
                    $elemento.val(moment(this.value, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm'));

                    if ($elemento.is(':not([readonly])')) {
                        $elemento.data('daterangepicker').elementChanged();
                    }

                    $elemento.change();
                } else if ($elemento.is('select.select-tabela')) {
                    selectsACarregar[$elemento.attr('name')] = {
                        elemento: $elemento,
                        valor: this.value.slice(0, this.value.indexOf(';#'))
                    };
                } else if ($elemento.is('select')) {
                    selectsACarregar[$elemento.attr('name')] = {
                        elemento: $elemento,
                        valor: this.value
                    };
                } else {
                    $elemento.val(this.value);
                    $elemento.change();
                }
            });

            PreencherSelectsConsiderandoDependencia(selectsACarregar);

            CarregarListaResultadoAnalise().then(function () {
                ModificarFormState($('select#status').val());

                return $.when(true);
            }).then(function () {
                return CarregarAgendamentoResponsaveis(atributos.ows_CodigoAgendamento.value).then(function () {
                    InicializarHistorico();
                    CarregarHistoricoPorAgendamento(atributos.ows_ID.value);
                    CarregarPaineisDeAnexos();
                    $promise.resolve();
                }).fail(function (response) {
                    $promise.reject(response);
                });
            });
        }
    });

    return $promise;
}

function ProcurarAprovacaoPorAbaAnaliseId(abaAnaliseId) {
    var chaves = Object.keys(aprovacoes);

    for (var i = 0; i < chaves.length; i ++) {
        if (aprovacoes[chaves[i]]._abaAnaliseId == abaAnaliseId) {
            return aprovacoes[chaves[i]];
        }
    }

    return null;
}

function CarregarAgendamentoResponsaveis(agendamento) {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetListItems',
        listName: 'Agendamentos - Responsáveis',
        CAMLQuery: '<Query><Where><Eq><FieldRef Name="CodigoAgendamento" /><Value Type="Text">' + agendamento + '</Value></Eq></Where></Query>',
        CAMLViewFields: '<ViewFields><FieldRef Name="ID" /><FieldRef Name="Title" /><FieldRef Name="CodigoAgendamento" /><FieldRef Name="TipoResponsavel" /><FieldRef Name="Pessoa" /><FieldRef Name="Resultado" /><FieldRef Name="ExecucaoLoteAcompanhada" /><FieldRef Name="Avaliado" /><FieldRef Name="Avaliador" /><FieldRef Name="Observacoes" /><FieldRef Name="MeioAmbienteAbastecimentoVacuo" /><FieldRef Name="MeioAmbienteAbastecimentoGranel" /><FieldRef Name="MeioAmbienteAbastecimentoManual" /><FieldRef Name="MeioAmbienteAcondicionamentoMate" /><FieldRef Name="MeioAmbienteAcondicionamentoReci" /><FieldRef Name="MeioAmbienteAumentoGeracaoResidu" /><FieldRef Name="MeioAmbienteTipoResiduosGeradosJ" /><FieldRef Name="MeioAmbienteAumentoConsumoAguaLi" /><FieldRef Name="MeioAmbienteAumentoConsumoEnergi" /><FieldRef Name="MeioAmbienteAumentoConsumoAguaFa" /><FieldRef Name="SimilarCodigoAgendamento" /><FieldRef Name="ReprovadoMotivo" /></ViewFields>',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            var registros = $(Data.responseText).find('z\\:row');

            if (registros.length <= 0) {
                $promise.reject({
                    errorCode: '0x99999998',
                    errorText: 'Registros de responsáveis não encontrados'
                });

                return;
            }

            aprovacoes = {};
            var promessas = [];

            $.each(registros, function () {
                var responsavel = GetResponsavelPorNomeETipoDeLote(this.attributes.ows_TipoResponsavel.value, $('#tipoDeLote').val());

                aprovacoes[this.attributes.ows_TipoResponsavel.value] = {
                    ID: this.attributes.ows_ID.value,
                    Pessoa: this.attributes.ows_Pessoa.value,
                    TipoResponsavel: this.attributes.ows_TipoResponsavel.value,
                    Resultado: this.attributes.ows_Resultado.value,
                    ExecucaoLoteAcompanhada: this.attributes.ows_ExecucaoLoteAcompanhada.value,
                    Avaliado: this.attributes.ows_Avaliado != undefined ? this.attributes.ows_Avaliado.value : null,
                    Avaliador: this.attributes.ows_Avaliador != undefined ? this.attributes.ows_Avaliador.value : null,
                    Observacoes: this.attributes.ows_Observacoes != undefined ? this.attributes.ows_Observacoes.value : null,
                    SimilarCodigoAgendamento: this.attributes.ows_SimilarCodigoAgendamento != undefined ? this.attributes.ows_SimilarCodigoAgendamento.value : null,
                    ReprovadoMotivo: this.attributes.ows_ReprovadoMotivo != undefined ? this.attributes.ows_ReprovadoMotivo.value : null,
                    MeioAmbienteAbastecimentoVacuo: this.attributes.ows_MeioAmbienteAbastecimentoVacuo != undefined ? this.attributes.ows_MeioAmbienteAbastecimentoVacuo.value : null,
                    MeioAmbienteAbastecimentoGranel: this.attributes.ows_MeioAmbienteAbastecimentoGranel != undefined ? this.attributes.ows_MeioAmbienteAbastecimentoGranel.value : null,
                    MeioAmbienteAbastecimentoManual: this.attributes.ows_MeioAmbienteAbastecimentoManual != undefined ? this.attributes.ows_MeioAmbienteAbastecimentoManual.value : null,
                    MeioAmbienteAcondicionamentoMate: this.attributes.ows_MeioAmbienteAcondicionamentoMate != undefined ? this.attributes.ows_MeioAmbienteAcondicionamentoMate.value : null,
                    MeioAmbienteAcondicionamentoReci: this.attributes.ows_MeioAmbienteAcondicionamentoReci != undefined ? this.attributes.ows_MeioAmbienteAcondicionamentoReci.value : null,
                    MeioAmbienteAumentoGeracaoResidu: this.attributes.ows_MeioAmbienteAumentoGeracaoResidu != undefined ? this.attributes.ows_MeioAmbienteAumentoGeracaoResidu.value : null,
                    MeioAmbienteTipoResiduosGeradosJ: this.attributes.ows_MeioAmbienteTipoResiduosGeradosJ != undefined ? this.attributes.ows_MeioAmbienteTipoResiduosGeradosJ.value : null,
                    MeioAmbienteAumentoConsumoAguaLi: this.attributes.ows_MeioAmbienteAumentoConsumoAguaLi != undefined ? this.attributes.ows_MeioAmbienteAumentoConsumoAguaLi.value : null,
                    MeioAmbienteAumentoConsumoEnergi: this.attributes.ows_MeioAmbienteAumentoConsumoEnergi != undefined ? this.attributes.ows_MeioAmbienteAumentoConsumoEnergi.value : null,
                    MeioAmbienteAumentoConsumoAguaFa: this.attributes.ows_MeioAmbienteAumentoConsumoAguaFa != undefined ? this.attributes.ows_MeioAmbienteAumentoConsumoAguaFa.value : null,
                    _abaAnaliseId: responsavel.abaAnaliseId,
                    _abaAcompanhanteId: responsavel.abaAcompanhanteId,
                };

                var usuarioNome = FiltrarNomeUsuarioPorPessoaId(this.attributes.ows_Pessoa.value);

                promessas.push(CarregarUsuarioPorLoginName(usuarioNome).then(function (usuario) {
                    PreencherPeoplePicker(responsavel.peoplePickerId, usuario);
                }));

                if (responsavel.abaAnaliseId) {
                    promessas.push(PreencherAbaAnalises(responsavel));
                }
            });

            if ($('#pills-analises .nav.nav-tabs[role="tablist"] li a.active:not([style*="display: none"])').length == 0) {
                $('#pills-analises .nav.nav-tabs[role="tablist"] li a:not([style*="display: none"]):first').click();
            }

            $.when($, promessas).then(function () {
                $promise.resolve(registros);
            }).fail(function () {
                $promise.resolve(registros);
            });
        }
    });

    return $promise;
}

function AtualizarAprovacaoEmMemoria(responsavel) {
    aprovacoes[responsavel.nome].Pessoa = null;

    if (responsavel.abaAnaliseId) {
        var $abaAnalise = $('#' + responsavel.abaAnaliseId);
        aprovacoes[responsavel.nome].ExecucaoLoteAcompanhada = $abaAnalise.find('[name=ExecucaoLoteAcompanhada]').prop('checked') ? '1' : '0';
        aprovacoes[responsavel.nome].Resultado = $abaAnalise.find('[name=Resultado]').val();
        aprovacoes[responsavel.nome].Observacoes = $abaAnalise.find('[name=ObservacoesAnalise]').val();
        aprovacoes[responsavel.nome].ReprovadoMotivo = $abaAnalise.find('[name=ReprovadoMotivo]').val();

        if (responsavel.nome == 'Meio Ambiente - Responsável') {
            switch ($('[name=TipoLote]').val()) {
                case 'Brinde':
                    var $brinde = $('#brindeMeioAmbiente');
                    aprovacoes[responsavel.nome].ExecucaoLoteAcompanhada = $brinde.find('[name=ExecucaoLoteAcompanhada]').prop('checked') ? '1' : '0';
                    break;
                case 'Envase':
                    var $envase = $('#envaseMeioAmbiente');
                    aprovacoes[responsavel.nome].ExecucaoLoteAcompanhada = $envase.find('[name=ExecucaoLoteAcompanhada]').prop('checked') ? '1' : '0';
                    aprovacoes[responsavel.nome].MeioAmbienteAumentoGeracaoResidu = $envase.find('[name=MeioAmbienteAumentoGeracaoResidu]').prop('checked') ? '1' : '0';
                    aprovacoes[responsavel.nome].MeioAmbienteTipoResiduosGeradosJ = $envase.find('[name=MeioAmbienteTipoResiduosGeradosJ]').prop('checked') ? '1' : '0';
                    aprovacoes[responsavel.nome].MeioAmbienteAumentoConsumoAguaLi = $envase.find('[name=MeioAmbienteAumentoConsumoAguaLi]').prop('checked') ? '1' : '0';
                    aprovacoes[responsavel.nome].MeioAmbienteAcondicionamentoMate = $envase.find('[name=MeioAmbienteAcondicionamentoMate]').val();
                    aprovacoes[responsavel.nome].MeioAmbienteAcondicionamentoReci = $envase.find('[name=MeioAmbienteAcondicionamentoReci]').val();
                    break;
                case 'Fabricação':
                    var $fabricacao = $('#fabricacaoMeioAmbiente');
                    aprovacoes[responsavel.nome].ExecucaoLoteAcompanhada = $fabricacao.find('[name=ExecucaoLoteAcompanhada]').prop('checked') ? '1' : '0';
                    aprovacoes[responsavel.nome].MeioAmbienteAumentoConsumoAguaLi = $fabricacao.find('[name=MeioAmbienteAumentoConsumoAguaLi]').prop('checked') ? '1' : '0';
                    aprovacoes[responsavel.nome].MeioAmbienteAumentoConsumoEnergi = $fabricacao.find('[name=MeioAmbienteAumentoConsumoEnergi]').val();
                    aprovacoes[responsavel.nome].MeioAmbienteAumentoConsumoAguaFa = $fabricacao.find('[name=MeioAmbienteAumentoConsumoAguaFa]').val();
                    aprovacoes[responsavel.nome].MeioAmbienteAbastecimentoGranel = $fabricacao.find('[name=MeioAmbienteAbastecimentoGranel]').val();
                    aprovacoes[responsavel.nome].MeioAmbienteAbastecimentoManual = $fabricacao.find('[name=MeioAmbienteAbastecimentoManual]').val();
                    aprovacoes[responsavel.nome].MeioAmbienteAbastecimentoVacuo = $fabricacao.find('[name=MeioAmbienteAbastecimentoVacuo]').val();
                    break;
            }
        }
    }

    var usuarioDoPeoplePicker = PegarUsuarioDoPeoplePicker(responsavel.peoplePickerId);

    if (!usuarioDoPeoplePicker) {
        return $.when(aprovacoes[responsavel.nome]);
    }

    return CarregarUsuarioPorLoginName(usuarioDoPeoplePicker.loginName).then(function (usuario) {
        aprovacoes[responsavel.nome].Pessoa = usuario.id;

        return aprovacoes[responsavel.nome];
    });
}

function FiltrarNomeUsuarioPorPessoaId(pessoaId) {
    return pessoaId.slice(pessoaId.indexOf(';#') + ';#'.length);
}

function FiltrarIdPorPessoaId(pessoaId) {
    if (pessoaId.indexOf(';#') == -1) {
        return pessoaId;
    }

    return pessoaId.slice(0, pessoaId.indexOf(';#'));
}

function PreencherAbaAnalises(responsavel) {
    var aprovacao = aprovacoes[responsavel.nome];

    if (responsavel.abaAnaliseId == null) {
        return;
    }

    var $abaAnalise = $('#' + responsavel.abaAnaliseId);
    $abaAnalise.find('[name="ExecucaoLoteAcompanhada"]').prop('checked', aprovacao.ExecucaoLoteAcompanhada == '1');
    $abaAnalise.find('[name="Pessoa"]').val(FiltrarNomeUsuarioPorPessoaId(aprovacao.Pessoa));
    $abaAnalise.find('[name="Resultado"]').val(aprovacao.Resultado);
    $abaAnalise.find('[name="ObservacoesAnalise"]').val(aprovacao.Observacoes);
    if (aprovacao.ReprovadoMotivo != null) $abaAnalise.find('[name="ReprovadoMotivo"]').val(aprovacao.ReprovadoMotivo);
    if (aprovacao.MeioAmbienteAbastecimentoVacuo != null) $abaAnalise.find('[name="MeioAmbienteAbastecimentoVacuo"]').val(aprovacao.MeioAmbienteAbastecimentoVacuo);
    if (aprovacao.MeioAmbienteAbastecimentoGranel != null) $abaAnalise.find('[name="MeioAmbienteAbastecimentoGranel"]').val(aprovacao.MeioAmbienteAbastecimentoGranel);
    if (aprovacao.MeioAmbienteAbastecimentoManual != null) $abaAnalise.find('[name="MeioAmbienteAbastecimentoManual"]').val(aprovacao.MeioAmbienteAbastecimentoManual);
    if (aprovacao.MeioAmbienteAcondicionamentoMate != null) $abaAnalise.find('[name="MeioAmbienteAcondicionamentoMate"]').val(aprovacao.MeioAmbienteAcondicionamentoMate);
    if (aprovacao.MeioAmbienteAcondicionamentoReci != null) $abaAnalise.find('[name="MeioAmbienteAcondicionamentoReci"]').val(aprovacao.MeioAmbienteAcondicionamentoReci);
    if (aprovacao.MeioAmbienteAumentoGeracaoResidu != null) $abaAnalise.find('[name="MeioAmbienteAumentoGeracaoResidu"]').prop('checked', aprovacao.MeioAmbienteAumentoGeracaoResidu == '1');
    if (aprovacao.MeioAmbienteTipoResiduosGeradosJ != null) $abaAnalise.find('[name="MeioAmbienteTipoResiduosGeradosJ"]').prop('checked', aprovacao.MeioAmbienteTipoResiduosGeradosJ == '1');
    if (aprovacao.MeioAmbienteAumentoConsumoAguaLi != null) $abaAnalise.find('[name="MeioAmbienteAumentoConsumoAguaLi"]').prop('checked', aprovacao.MeioAmbienteAumentoConsumoAguaLi == '1');
    if (aprovacao.MeioAmbienteAumentoConsumoEnergi != null) $abaAnalise.find('[name="MeioAmbienteAumentoConsumoEnergi"]').val(aprovacao.MeioAmbienteAumentoConsumoEnergi);
    if (aprovacao.MeioAmbienteAumentoConsumoAguaFa != null) $abaAnalise.find('[name="MeioAmbienteAumentoConsumoAguaFa"]').val(aprovacao.MeioAmbienteAumentoConsumoAguaFa);

    $abaAnalise.find('[name=Pessoa]').attr('disabled', true);
    $abaAnalise.find('[name=ExecucaoLoteAcompanhada]').attr('disabled', true);
    $abaAnalise.find('[name=Resultado]').attr('disabled', true);
    $abaAnalise.find('[name=ObservacoesAnalise]').attr('disabled', true);
    $abaAnalise.find('[name=ReprovadoMotivo]').attr('disabled', true);
    $abaAnalise.find('[name="MeioAmbienteAbastecimentoVacuo"]').attr('disabled', true);
    $abaAnalise.find('[name="MeioAmbienteAbastecimentoGranel"]').attr('disabled', true);
    $abaAnalise.find('[name="MeioAmbienteAbastecimentoManual"]').attr('disabled', true);
    $abaAnalise.find('[name="MeioAmbienteAcondicionamentoMate"]').attr('disabled', true);
    $abaAnalise.find('[name="MeioAmbienteAcondicionamentoReci"]').attr('disabled', true);
    $abaAnalise.find('[name="MeioAmbienteAumentoGeracaoResidu"]').attr('disabled', true);
    $abaAnalise.find('[name="MeioAmbienteTipoResiduosGeradosJ"]').attr('disabled', true);
    $abaAnalise.find('[name="MeioAmbienteAumentoConsumoAguaLi"]').attr('disabled', true);
    $abaAnalise.find('[name="MeioAmbienteAumentoConsumoEnergi"]').attr('disabled', true);
    $abaAnalise.find('[name="MeioAmbienteAumentoConsumoAguaFa"]').attr('disabled', true);

    $abaAnalise.parent()
        .closest('div.tab-pane[role=tabpanel]')
        .find('a[href="#' + responsavel.abaAnaliseId + '"]')
        .show();
}

function PreencherSelectsConsiderandoDependencia(selectsACarregar) {
    var sorter = new Toposort();

    Object.keys(selectsACarregar).forEach(function (index) {
        sorter.add(index, ListarDependenciasPorSelect(index));
    });

    $.each(sorter.sort().reverse(), function (index, value) {
        var select = selectsACarregar[value];
        select.elemento.val(select.valor);
        select.elemento.change();
    });
}

function CarregarCategoriaProjeto() {
    var $promise = $.Deferred();

    $().SPServices({
        operation: "GetList",
        listName: "Agendamentos",
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).find('Field[DisplayName="Categoria do projeto"] CHOICE').each(function () {
                $('select#categoriaDoProjeto').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarMotivoCancelamento() {
    var $promise = $.Deferred();

    $().SPServices({
        operation: "GetList",
        listName: "Agendamentos",
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).find('Field[DisplayName="Motivo de cancelamento"] CHOICE').each(function () {
                $('select#canceladoMotivo').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarMotivoNaoExecutado() {
    var $promise = $.Deferred();

    $().SPServices({
        operation: "GetList",
        listName: "Agendamentos",
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).find('Field[DisplayName="Motivo não execução"] CHOICE').each(function () {
                $('select#naoExecutadoMotivo').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarFabricas() {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetListItems',
        listName: 'Fábricas Internas e Armazenamento de Fábricas Terceiras',
        CAMLViewFields: '<ViewFields><FieldRef Name="Title" /><FieldRef Name="ID" /><FieldRef Name="Numero" /></ViewFields>',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).SPFilterNode("z:row").each(function () {
                $('select#fabrica').append('<option value="' + $(this).attr("ows_ID") + '">' + $(this).attr("ows_Title") + ' - ' + $(this).attr("ows_Numero") + '</option>')
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarLinhasDoProduto() {
    var $promise = $.Deferred();

    $().SPServices({
        operation: "GetList",
        listName: "Agendamentos",
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).find('Field[DisplayName="Linha do produto"] CHOICE').each(function () {
                $('select#linhaDoProduto').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarLinhasEquipamentos(fabrica, tipoLote) {
    var $promise = $.Deferred();
    var linhaEquipamento = $('select#linhaEquipamento');

    $().SPServices({
        operation: 'GetListItems',
        listName: 'Linhas e Equipamentos',
        CAMLQuery: '<Query><Where><And><And><Eq><FieldRef Name="Ativa" /><Value Type="Boolean">1</Value></Eq><Eq><FieldRef Name="Fabrica" /><Value Type="Lookup">' + fabrica + '</Value></Eq></And><Eq><FieldRef Name="TipoLote" /><Value Type="Choice">' + tipoLote + '</Value></Eq></And></Where></Query>',
        CAMLViewFields: '<ViewFields><FieldRef Name="Title" /><FieldRef Name="ID" /></ViewFields>',
        async: false,
        completefunc: function (Data, Status) {
            linhaEquipamento.find('option')
                .remove()
                .end()
                .append('<option disabled selected>Selecione uma opção</option>');

            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).SPFilterNode("z:row").each(function () {
                linhaEquipamento.append('<option value="' + $(this).attr("ows_ID") + '">' + $(this).attr("ows_Title") + '</option>')
            });

            $promise.resolve();
        }
    });
    return $promise;
}

function CarregarLinhasEquipamentosById(linhaEquipamentoId) {
    var $promise = $.Deferred();
    var linhaEquipamento = $('select#linhaEquipamento');
    var $labelQuantidadePecas = $('label[for="produtoQuantidade"]')
    $labelQuantidadePecas.text("Quantidade (peças)");

    $().SPServices({
        operation: 'GetListItems',
        listName: 'Linhas e Equipamentos',
        CAMLQuery: '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Number">' + linhaEquipamentoId + '</Value></Eq></Where></Query>',
        CAMLViewFields: '<ViewFields><FieldRef Name="Title" /><FieldRef Name="ID" /></ViewFields>',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).SPFilterNode("z:row").each(function () {
                if ($("select#tipoDeLote").val() == 'Fabricação') {
                    $labelQuantidadePecas.text("Quantidade (kg) de " + AtributoNumber($(this).attr("ows_CapacidadeMin")) + " até " + AtributoNumber($(this).attr("ows_CapacidadeMax")));
                } else {
                    $labelQuantidadePecas.text("Quantidade (peças) de " + AtributoNumber($(this).attr("ows_CapacidadeMin")) + " até " + AtributoNumber($(this).attr("ows_CapacidadeMax")));
                }
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarListaGrauComplexidade() {
    var $promise = $.Deferred();
    var mensagem = {
        1: "1 - Sem modificação",
        2: "2 - Leve ",
        3: "3 - Avançado",
        4: "4 - Inovador"
    };

    $().SPServices({
        operation: 'GetList',
        listName: 'Agendamentos',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).find('Field[DisplayName="Grau de complexidade"] CHOICE').each(function () {
                if(this.innerHTML > 0) {
                    $('select#grauComplexidade').append('<option value="' + this.innerHTML + '">' + mensagem[this.innerHTML] + '</option>');
                }
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarListaMotivos() {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetList',
        listName: 'Agendamentos',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).find('Field[DisplayName="Motivo"] CHOICE').each(function () {
                $('select#motivo').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarListaStatus() {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetList',
        listName: 'Agendamentos',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).find('Field[DisplayName="Status"] CHOICE').each(function () {
                $('select#status').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarListaResultadoAnalise() {
    var valorResultado = $('select[name=GrauComplexidade] :selected').val();

    if (valorResultado && valorResultado.startsWith("2")) {
        return CarregarListaResultadoAnaliseComSimilaridade();
    } else {
        return CarregarListaResultadoAnaliseSemSimilaridade();
    }
}

function CarregarListaResultadoAnaliseComSimilaridade() {
    var $promise = $.Deferred();
    var $resultado = $('select[name=Resultado]');

    $().SPServices({
        operation: 'GetList',
        listName: 'Agendamentos - Responsáveis',
        completefunc: function (Data, Status) {
            $resultado.find('option')
                .remove()
                .end();

            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).find('Field[DisplayName="Resultado"] CHOICE').each(function () {
                $resultado.append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarListaMotivoAnalise() {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetList',
        listName: 'Agendamentos - Responsáveis',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            var $resultado = $('select[name=ReprovadoMotivo]');

            $(Data.responseXML).find('Field[DisplayName="Motivo Reprovação"] CHOICE').each(function () {
                $resultado.append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarListasDeMeioAmbiente() {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetList',
        listName: 'Agendamentos - Responsáveis',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            var $response = $(Data.responseText);
            var $MeioAmbienteAbastecimentoGranel = $('select[name=MeioAmbienteAbastecimentoGranel]');

            $response.find('Field[DisplayName="Abastecimento granel"] CHOICE').each(function () {
                $MeioAmbienteAbastecimentoGranel.append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            var $MeioAmbienteAbastecimentoManual = $('select[name=MeioAmbienteAbastecimentoManual]');

            $response.find('Field[DisplayName="Abastecimento manual"] CHOICE').each(function () {
                $MeioAmbienteAbastecimentoManual.append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            var $MeioAmbienteAbastecimentoVacuo = $('select[name=MeioAmbienteAbastecimentoVacuo]');

            $response.find('Field[DisplayName="Abastecimento vácuo"] CHOICE').each(function () {
                $MeioAmbienteAbastecimentoVacuo.append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            var $MeioAmbienteAcondicionamentoMate = $('select[name=MeioAmbienteAcondicionamentoMate]');

            $response.find('Field[DisplayName="Acondicionamento dos materiais de embalagem retornável"] CHOICE').each(function () {
                $MeioAmbienteAcondicionamentoMate.append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            var $MeioAmbienteAcondicionamentoReci = $('select[name=MeioAmbienteAcondicionamentoReci]');

            $response.find('Field[DisplayName="Acondicionamento reciclável"] CHOICE').each(function () {
                $MeioAmbienteAcondicionamentoReci.append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarListaResultadoAnaliseSemSimilaridade() {
    var $promise = $.Deferred();
    var $resultado = $('select[name=Resultado]');

    $().SPServices({
        operation: 'GetList',
        listName: 'Agendamentos - Responsáveis',
        completefunc: function (Data, Status) {
            $resultado.find('option')
                .remove()
                .end();

            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).find('Field[DisplayName="Resultado"] CHOICE').each(function () {
                if (this.innerHTML == 'Aprovado por Similaridade') {
                    return true;
                }
                $resultado.append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarListaTiposLotes() {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetList',
        listName: 'Agendamentos',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            $(Data.responseXML).find('Field[DisplayName="Tipo de Lote"] CHOICE').each(function () {
                if (this.innerHTML != "Picking") {
                    $('select#tipoDeLote').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
                }
            });

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarAgendamentoIdOffset() {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetListItems',
        listName: 'Configuração – Sequência',
        CAMLQuery: '<Query><Where><Eq><FieldRef Name="Identificador" /><Value Type="Choice">Agendamento</Value></Eq></Where></Query>',
        CAMLViewFields: '<ViewFields><FieldRef Name="Title" /><FieldRef Name="ID" /></ViewFields>',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            var $result = $(Data.responseText).find('z\\:row:first');

            if ($result.length > 0) {
                $promise.resolve(AtributoNumber($result.attr('ows_ultimovalor')));
            } else {
                $promise.resolve(0);
            }
        }
    });

    return $promise;
}

function DispararCarregarLinhasEquipamentos() {
    var fabricaVal = $("select#fabrica :selected").text();
    var tipoLoteVal = $("select#tipoDeLote").val();

    if (tipoLoteVal && fabricaVal) {
        CarregarLinhasEquipamentos(fabricaVal, tipoLoteVal);
    }
}

function EscolherAgendamento() {
    var agendamentoId = prompt('Digite o ID do agendamento');

    if (agendamentoId) {
        ResetarAgendamento();

        CarregarAgendamento(agendamentoId).fail(function (response) {
            alert('Ops., algo deu errado. Mensagem: ' + response.errorText);
        });
    }
}

function ExcluirResponsaveisAgendamentosPorCodigoAgendamento(codigoAgendamento) {
    $().SPServices.SPUpdateMultipleListItems({
        async: false,
        batchCmd: "Delete",
        listName: "AgendamentosResponsaveis",
        CAMLQuery: "<Query>"
            + "<Where>" +
            +"<Eq>" +
            +"<FieldRef Name='CodigoAgendamento' />" +
            +"<Value Type='Text'>" + codigoAgendamento + "</Value>" +
            +"</Eq>" +
            +"</Where>" +
            "</Query>",
        completefunc: function (xData, Status) {
            alert("Agendamentos Responsáveis Concluídos - Código do Agendamento: " + codigoAgendamento);
        }
    });

}

function GravarCodigoAgendamento($record) {
    return CarregarAgendamentoIdOffset().then(function (offset) {
        var $promise = $.Deferred();

        $().SPServices({
            operation: "UpdateListItems",
            batchCmd: 'Update',
            listName: 'Agendamentos',
            ID: $record.attr('ows_ID'),
            valuepairs: [['CodigoAgendamento', offset + AtributoNumber($record.attr('ows_ID'))]],
            completefunc: function (xData, Status) {
                if (Status != 'success') {
                    $promise.reject({
                        errorCode: '0x99999999',
                        errorText: 'Erro Remoto'
                    });

                    return;
                }

                var $response = $(xData.responseText);
                var errorCode = $response.find('ErrorCode').text();

                if (errorCode == '0x00000000') {
                    $promise.resolve({
                        record: $response.find('z\\:row:first')
                    });
                } else {
                    $promise.reject({
                        errorCode: errorCode,
                        errorText: $response.find('ErrorText').text()
                    });
                }

                $promise.resolve();
            }
        });

        return $promise;
    });
}

function GerarISPClientPeoplePickerEntityPorUsuario(usuario) {
    return {
        Description: usuario.email,
        DisplayText: usuario.nome,
        EntityType: 'User',
        IsResolved: false,
        Key: usuario.loginName
    };
}

function InserirAgendamento() {
    var $promise = $.Deferred();
    CalcularCamposCalculaveis();
    var campos = [];

    $('#main [name].salvar-campo').each(function () {
        var $this = $(this);

        if ($this.is('[type=checkbox]')) {
            campos.push([this.name, $this.prop('checked') ? '1' : '0']);
        } else if ($this.is('.date-time-picker')) {
            campos.push([this.name, moment($this.val(), 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm:ss[-00:00]')]);
        } else if ($this.val() != undefined) {
            campos.push([this.name, $this.val()]);
        }
    });

    campos.push(['Status', 'Rascunho']);

    $().SPServices({
        operation: "UpdateListItems",
        batchCmd: "New",
        listName: "Agendamentos",
        valuepairs: campos,
        completefunc: function (xData, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            var $response = $(xData.responseText);
            var errorCode = $response.find('ErrorCode').text();

            if (errorCode == '0x00000000') {
                $promise.resolve({
                    record: $response.find('z\\:row:first')
                });
            } else {
                $promise.reject({
                    errorCode: errorCode,
                    errorText: $response.find('ErrorText').text()
                });
            }
        }
    });

    return $promise.then(function (response) {
        return GravarCodigoAgendamento(response.record).then(function (response) {
            let $TipoLote = $('[name=TipoLote]');
            let promises = [];
            let responsaveis = GetResponsaveisPorTipoDeLote($TipoLote.val());

            $.each(responsaveis, function (i, responsavel) {
                var usuarioDoPeoplePicker = PegarUsuarioDoPeoplePicker(responsavel.peoplePickerId);

                if (usuarioDoPeoplePicker) {
                    promises.push(CarregarUsuarioPorLoginName(usuarioDoPeoplePicker.loginName).then(function (usuario) {
                        return InserirResponsavelAgendamento(response.record.attr('ows_CodigoAgendamento'), responsavel, usuario);
                    }));
                }
            });

            return $.when.apply($, promises).then(function () {
                return response;
            });
        });
    });
}

var SetoresResponsaveis = [
    {tipoDeLote: 'Brinde',     nome: 'DL/PCL - Responsável',           peoplePickerId: 'peoplePickerAbaRespRespDLPCL',         abaAcompanhanteId: null,                         abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     nome: 'Qualidade - Responsável',        peoplePickerId: 'peoplePickerAbaRespRespQualidade',     abaAcompanhanteId: null,                         abaAnaliseId: 'tab-qualidade-resp'},
    {tipoDeLote: 'Brinde',     nome: 'Qualidade - Gerente',            peoplePickerId: 'peoplePickerAbaRespGerQualidade',      abaAcompanhanteId: null,                         abaAnaliseId: 'tab-analise-qualidade-ger'},
    {tipoDeLote: 'Envase',     nome: 'DL/PCL - Responsável',           peoplePickerId: 'peoplePickerAbaRespRespDLPCL',         abaAcompanhanteId: null,                         abaAnaliseId: null},
    {tipoDeLote: 'Envase',     nome: 'Eng. Envase - Responsável',      peoplePickerId: 'peoplePickerAbaRespRespEngEnvase',     abaAcompanhanteId: null,                         abaAnaliseId: 'tab-eng-envase-resp'},
    {tipoDeLote: 'Envase',     nome: 'Eng. Envase - Gerente',          peoplePickerId: 'peoplePickerAbaRespGerEngEnvase',      abaAcompanhanteId: null,                         abaAnaliseId: null},
    {tipoDeLote: 'Envase',     nome: 'Inovação DE - Responsável',      peoplePickerId: 'peoplePickerAbaRespRespInovDE',        abaAcompanhanteId: null,                         abaAnaliseId: 'tab-inov-de-resp'},
    {tipoDeLote: 'Envase',     nome: 'Inovação DE - Gerente',          peoplePickerId: 'peoplePickerAbaRespGerInovDE',         abaAcompanhanteId: null,                         abaAnaliseId: null},
    {tipoDeLote: 'Envase',     nome: 'Qualidade - Responsável',        peoplePickerId: 'peoplePickerAbaRespRespQualidade',     abaAcompanhanteId: null,                         abaAnaliseId: 'tab-qualidade-resp'},
    {tipoDeLote: 'Envase',     nome: 'Qualidade - Gerente',            peoplePickerId: 'peoplePickerAbaRespGerQualidade',      abaAcompanhanteId: null,                         abaAnaliseId: 'tab-analise-qualidade-ger'},
    {tipoDeLote: 'Envase',     nome: 'Fábrica - Coord. Programação',   peoplePickerId: 'peoplePickerAbaRespCoordProgFabrica',  abaAcompanhanteId: null,                         abaAnaliseId: null},
    {tipoDeLote: 'Envase',     nome: 'Fábrica - Coord. de Manufatura', peoplePickerId: 'peoplePickerAbaRespCoordManFabrica',   abaAcompanhanteId: null,                         abaAnaliseId: 'tab-fabrica-resp'},
    {tipoDeLote: 'Envase',     nome: 'Fábrica - Gerente',              peoplePickerId: 'peoplePickerAbaRespGerFabrica',        abaAcompanhanteId: null,                         abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', nome: 'DL/PCL - Responsável',           peoplePickerId: 'peoplePickerAbaRespRespDLPCL',         abaAcompanhanteId: null,                         abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', nome: 'Eng. Fabricação - Responsável',  peoplePickerId: 'peoplePickerAbaRespRespEngFabricacao', abaAcompanhanteId: null,                         abaAnaliseId: 'tab-eng-fabricacao-resp'},
    {tipoDeLote: 'Fabricação', nome: 'Eng. Fabricação - Gerente',      peoplePickerId: 'peoplePickerAbaRespGerEngFabricacao',  abaAcompanhanteId: null,                         abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', nome: 'Inovação DF - Responsável',      peoplePickerId: 'peoplePickerAbaRespRespInovDF',        abaAcompanhanteId: null,                         abaAnaliseId: 'tab-inov-df-resp'},
    {tipoDeLote: 'Fabricação', nome: 'Inovação DF - Gerente',          peoplePickerId: 'peoplePickerAbaRespGerInovDF',         abaAcompanhanteId: null,                         abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', nome: 'Qualidade - Responsável',        peoplePickerId: 'peoplePickerAbaRespRespQualidade',     abaAcompanhanteId: null,                         abaAnaliseId: 'tab-qualidade-resp'},
    {tipoDeLote: 'Fabricação', nome: 'Qualidade - Gerente',            peoplePickerId: 'peoplePickerAbaRespGerQualidade',      abaAcompanhanteId: null,                         abaAnaliseId: 'tab-analise-qualidade-ger'},
    {tipoDeLote: 'Fabricação', nome: 'Fábrica - Coord. Programação',   peoplePickerId: 'peoplePickerAbaRespCoordProgFabrica',  abaAcompanhanteId: null,                         abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', nome: 'Fábrica - Coord. de Manufatura', peoplePickerId: 'peoplePickerAbaRespCoordManFabrica',   abaAcompanhanteId: null,                         abaAnaliseId: 'tab-fabrica-resp'},
    {tipoDeLote: 'Fabricação', nome: 'Fábrica - Gerente',              peoplePickerId: 'peoplePickerAbaRespGerFabrica',        abaAcompanhanteId: null,                         abaAnaliseId: null},
    // Acompanhantes
    {tipoDeLote: 'Brinde',     nome: 'Eng. Envase - Responsável',      peoplePickerId: 'peoplePickerAbaAcRespEngEnvase',       abaAcompanhanteId: 'pills-eng-envase-acomp',     abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     nome: 'Eng. Envase - Gerente',          peoplePickerId: 'peoplePickerAbaAcGerEngEnvase',        abaAcompanhanteId: 'pills-eng-envase-acomp',     abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     nome: 'Eng. Fabricação - Responsável',  peoplePickerId: 'peoplePickerAbaAcRespEngFabricacao',   abaAcompanhanteId: 'pills-eng-fabricacao-acomp', abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     nome: 'Eng. Fabricação - Gerente',      peoplePickerId: 'peoplePickerAbaAcGerEngFabricacao',    abaAcompanhanteId: 'pills-eng-fabricacao-acomp', abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     nome: 'Inovação DF - Responsável',      peoplePickerId: 'peoplePickerAbaAcRespInovDF',          abaAcompanhanteId: 'pills-inov-df-acomp',        abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     nome: 'Inovação DF - Gerente',          peoplePickerId: 'peoplePickerAbaAcGerInovDF',           abaAcompanhanteId: 'pills-inov-df-acomp',        abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     nome: 'Inovação DE - Responsável',      peoplePickerId: 'peoplePickerAbaAcRespInovDE',          abaAcompanhanteId: 'pills-inov-de-acomp',        abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     nome: 'Inovação DE - Gerente',          peoplePickerId: 'peoplePickerAbaAcGerInovDE',           abaAcompanhanteId: 'pills-inov-de-acomp',        abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     nome: 'Fábrica - Coord. Programação',   peoplePickerId: 'peoplePickerAbaAcCoordProgFabrica',    abaAcompanhanteId: 'pills-fabrica-acomp',        abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     nome: 'Fábrica - Coord. de Manufatura', peoplePickerId: 'peoplePickerAbaAcCoordManFabrica',     abaAcompanhanteId: 'pills-fabrica-acomp',        abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     nome: 'Fábrica - Gerente',              peoplePickerId: 'peoplePickerAbaAcGerFabrica',          abaAcompanhanteId: 'pills-fabrica-acomp',        abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     nome: 'Meio Ambiente - Responsável',    peoplePickerId: 'peoplePickerAbaAcRespMeioAmbiente',    abaAcompanhanteId: 'pills-meioambiente-acomp',   abaAnaliseId: 'tab-meio-ambiente-resp'},
    {tipoDeLote: 'Envase',     nome: 'Eng. Fabricação - Responsável',  peoplePickerId: 'peoplePickerAbaAcRespEngFabricacao',   abaAcompanhanteId: 'pills-eng-fabricacao-acomp', abaAnaliseId: null},
    {tipoDeLote: 'Envase',     nome: 'Eng. Fabricação - Gerente',      peoplePickerId: 'peoplePickerAbaAcGerEngFabricacao',    abaAcompanhanteId: 'pills-eng-fabricacao-acomp', abaAnaliseId: null},
    {tipoDeLote: 'Envase',     nome: 'Meio Ambiente - Responsável',    peoplePickerId: 'peoplePickerAbaAcRespMeioAmbiente',    abaAcompanhanteId: 'pills-meioambiente-acomp',   abaAnaliseId: 'tab-meio-ambiente-resp'},
    {tipoDeLote: 'Fabricação', nome: 'Eng. Envase - Responsável',      peoplePickerId: 'peoplePickerAbaAcRespEngEnvase',       abaAcompanhanteId: 'pills-eng-envase-acomp',     abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', nome: 'Eng. Envase - Gerente',          peoplePickerId: 'peoplePickerAbaAcGerEngEnvase',        abaAcompanhanteId: 'pills-eng-envase-acomp',     abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', nome: 'Inovação DE - Responsável',      peoplePickerId: 'peoplePickerAbaAcRespInovDE',          abaAcompanhanteId: 'pills-inov-de-acomp',        abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', nome: 'Inovação DE - Gerente',          peoplePickerId: 'peoplePickerAbaAcGerInovDE',           abaAcompanhanteId: 'pills-inov-de-acomp',        abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', nome: 'Meio Ambiente - Responsável',    peoplePickerId: 'peoplePickerAbaAcRespMeioAmbiente',    abaAcompanhanteId: 'pills-meioambiente-acomp',   abaAnaliseId: 'tab-meio-ambiente-resp'},
];

function GetResponsavelPorNome(nome) {
    return $.grep(SetoresResponsaveis, function (responsavel) {
        return responsavel.nome == nome;
    }).pop();
}

function GetResponsaveisPorTipoDeLote(tipoDeLote) {
    return $.grep(SetoresResponsaveis, function (responsavel) {
        return responsavel.tipoDeLote == tipoDeLote;
    });
}

function GetResponsavelPorNomeETipoDeLote(nome, tipoDeLote) {
    for (var i = 0; i < SetoresResponsaveis.length; i ++) {
        if (SetoresResponsaveis[i].nome == nome && SetoresResponsaveis[i].tipoDeLote == tipoDeLote) {
            return SetoresResponsaveis[i];
        }
    }

    return null;
}

function PegarPeoplePickerPorId(peoplePickerId) {
    var peoplePickerName = $('#' + peoplePickerId + ' .sp-peoplepicker-topLevel').attr('id');

    return SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerName];
}

function PegarUsuarioDoPeoplePicker(peoplePickerId) {
    var peoplePickerUser = PegarPeoplePickerPorId(peoplePickerId).GetAllUserInfo().pop();

    if (peoplePickerUser == undefined) {
        return null;
    }

    return {
        loginName: peoplePickerUser.Key,
        nome: peoplePickerUser.DisplayText,
        email: peoplePickerUser.EntityData.Email
    };
}

function InserirResponsavelAgendamento(codigoAgendamento, responsavel, usuario) {
    var $promise = $.Deferred();

    $().SPServices({
        operation: "UpdateListItems",
        batchCmd: "New",
        listName: "Agendamentos - Responsáveis",
        valuepairs: [
            ['CodigoAgendamento', codigoAgendamento],
            ['Title', codigoAgendamento + ' - ' + responsavel.nome],
            ['TipoResponsavel', responsavel.nome],
            ['Pessoa', usuario.id]
        ],
        completefunc: function (xData, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            var $response = $(xData.responseText);
            var errorCode = $response.find('ErrorCode').text();

            if (errorCode == '0x00000000') {
                $promise.resolve({
                    record: $response.find('z\\:row:first')
                });
            } else {
                $promise.reject({
                    errorCode: errorCode,
                    errorText: $response.find('ErrorText').text()
                });
            }
        }
    });

    return $promise;
}

function InstanciarDateTimePicker() {
    $('.date-time-picker:not([readonly])').daterangepicker({
        opens: 'center',
        singleDatePicker: true,
        showDropdowns: true,
        timePicker: true,
        timePicker24Hour: true,
        locale: {
            format: 'DD/MM/YYYY HH:mm',
            applyLabel: "Aplicar",
            cancelLabel: 'Limpar',
            daysOfWeek: [
                "Do",
                "Se",
                "Te",
                "Qu",
                "Qu",
                "Se",
                "Sa"
            ],
            monthNames: [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro"
            ]
        }
    });
}

function ListarDependenciasPorSelect(campo) {
    if (campo == 'LinhaEquipamento') {
        return ['TipoLote', 'Fabrica'];
    }

    return [];
}

var listGruposAdm = [
    'Administradores Lote Piloto',
    'Agendamento - DLL',
    'Agendamento - Planta Piloto',
    'Área - DL PCL'
];

var listDemaisGrupos = [
    'Administradores Lote Piloto',
    'Área - Engenharia de Envase',
    'Área - Engenharia de Fabricação',
    'Área - Fábrica',
    'Área - Inovação DE',
    'Área - Inovação DF',
    'Área - Meio Ambiente',
    'Área - Qualidade'
];

function VerificarGrupoRespOuAcomp() {
    var result = false;
    $().SPServices({
        operation: "GetGroupCollectionFromUser",
        userLoginName: $().SPServices.SPGetCurrentUser(),
        async: false,
        completefunc: function (xData, Status) {
            $.each(listDemaisGrupos, function (k, v) {
                if (($(xData.responseXML).find("Group[Name='" + v + "']").length >= 1)) {
                    result = true;
                    return false;
                } else {
                    result = false;
                }
            });

        }
    });

    return result;
}

function ModificarBotoesPorFormState(formState) {
    var $btnAgendar = $('.btn-agendar');
    var $btnExecutado = $('.btn-executado');
    var $btnDerivar = $('.btn-derivar');
    var $btnCancelar = $('.btn-cancelar-agendamento');
    var $btnSalvar = $('.btn-salvar');
    var $btnNaoExecutado = $('.btn-nao-executado');
    var $btnEditar = $('.btn-editar');
    var $btnEditarRespOuAcomp = $('.btn-editar-resp-acomp');
    var $btnAbandonar = $('.btn-abandonar');
    var $btnReagendar = $('.btn-reagendar');

    $btnAgendar.hide();
    $btnExecutado.hide();
    $btnDerivar.hide();
    $btnCancelar.hide();
    $btnSalvar.hide();
    $btnNaoExecutado.hide();
    $btnEditar.hide();
    $btnEditarRespOuAcomp.hide();
    $btnAbandonar.hide();
    $btnReagendar.hide();

    switch (formState) {
        case EM_CRIACAO:
            if (VerificarGrupoDlPclOuPlantaPiloto()) {
                $btnSalvar.show();
            }
            break;
        case RASCUNHO:
            if (VerificarGrupoDlPclOuPlantaPiloto()) {
                $btnEditar.show();
                $btnAgendar.show();
                $btnDerivar.show();
            }
            break;
        case RASCUNHO_EM_EDICAO:
            if (VerificarGrupoDlPclOuPlantaPiloto()) {
                $btnSalvar.show();
                $btnAgendar.show();
                $btnAbandonar.show();
            }
            break;
        case AGENDADO:
            if (VerificarGrupoDlPclOuPlantaPiloto()) {
                $btnCancelar.show();
                $btnDerivar.show();
                $btnEditar.show();
            }

            $().SPServices({
                operation: "GetGroupCollectionFromUser",
                userLoginName: $().SPServices.SPGetCurrentUser(),
                async: false,
                completefunc: function (xData, Status) {
                    var $xml = $(xData.responseXML);
                    var envase = listDemaisGrupos[1];
                    var engFabricacao = listDemaisGrupos[2];
                    var fabrica = listDemaisGrupos[3];
                    var inovDe = listDemaisGrupos[4];
                    var inovDf = listDemaisGrupos[5];
                    var qualidade = listDemaisGrupos[7];
                    var tipoLote = $("select#tipoDeLote").val();

                    if (tipoLote == 'Brinde' && usuarioPertenceAoGrupo($xml, qualidade)) {
                        $btnExecutado.show();
                        $btnNaoExecutado.show();
                        if (!$btnEditar.is(':visible')) {
                            $btnEditarRespOuAcomp.show();
                        }
                    } else if (tipoLote == 'Envase' && ((usuarioPertenceAoGrupo($xml, envase))
                                                    || usuarioPertenceAoGrupo($xml, inovDe)
                                                    || usuarioPertenceAoGrupo($xml, qualidade)
                                                    || usuarioPertenceAoGrupo($xml, fabrica))) {
                        $btnExecutado.show();
                        $btnNaoExecutado.show();
                        if (!$btnEditar.is(':visible')) {
                            $btnEditarRespOuAcomp.show();
                        }
                    } else if (tipoLote == 'Fabricação'&& ((usuarioPertenceAoGrupo($xml, engFabricacao))
                                                    || usuarioPertenceAoGrupo($xml, inovDf)
                                                    || usuarioPertenceAoGrupo($xml, qualidade)
                                                    || usuarioPertenceAoGrupo($xml, fabrica))) {
                        $btnExecutado.show();
                        $btnNaoExecutado.show();
                        if (!$btnEditar.is(':visible')) {
                            $btnEditarRespOuAcomp.show();
                        }
                    }
                }
            });
            break;
        case AGENDAMENTO_EM_EDICAO:
            if (VerificarGrupoDlPclOuPlantaPiloto()) {
                $btnSalvar.show();
                $btnAbandonar.show();
            }
            break;
        case RESP_ACOMP_AGENDADO_EM_EDICAO:
            if (VerificarGrupoRespOuAcomp()) {
                $btnSalvar.show();
                $btnAbandonar.show();
            }
            break;
        case EM_CANCELAMENTO:
            if (VerificarGrupoDlPclOuPlantaPiloto()) {
                $btnSalvar.show();
                $btnAbandonar.show();
            }
            break;
        case REGISTRO_DE_ANALISE:
            $btnEditar.show();
            break;
        case EM_NAO_EXECUCAO:
            if (VerificarGrupoRespOuAcomp()) {
                $btnSalvar.show();
                $btnAbandonar.show();
            }
            break;
        case LOTE_NAO_EXECUTADO:
            if (VerificarGrupoDlPclOuPlantaPiloto()) {
                $btnReagendar.show();
            }
            break;
        case EM_REGISTRO_DE_ANALISE:
            $btnSalvar.show();
            $btnAbandonar.show();
            break;
        case 'Aguardando Reagendamento':
            if (VerificarGrupoDlPclOuPlantaPiloto()) $btnDerivar.show();
            break;
    }
}

function usuarioPertenceAoGrupo($xml, grupo) {
    return $xml.find("Group[Name='" + grupo + "']").length >= 1;
}

function ModificarCamposPorFormState(formState) {
    var $TipoLote = $('[name=TipoLote]');
    var $Fabrica = $('[name=Fabrica]');
    var $LinhaEquipamento = $('[name=LinhaEquipamento]');
    var $CodigoProduto = $('[name=CodigoProduto]');
    var $LinhaProduto = $('[name=LinhaProduto]');
    var $DescricaoProduto = $('[name=DescricaoProduto]');
    var $Projeto = $('[name=Projeto]');
    var $CategoriaProjeto = $('[name=CategoriaProjeto]');
    var $Formula = $('[name=Formula]');
    var $QuantidadePecas = $('[name=QuantidadePecas]');
    var $Motivo = $('[name=Motivo]');
    var $EnvioAmostras = $('[name=EnvioAmostras]');
    var $ResponsavelAmostra = $('[name=ResponsavelAmostra]');
    var $QuantidadeAmostra = $('[name=QuantidadeAmostra]');
    var $CentroCusto = $('[name=CentroCusto]');
    var $GrauComplexidade = $('[name=GrauComplexidade]');
    var $InicioProgramado = $('[name=InicioProgramado]');
    var $DuracaoEstimadaHoras = $('[name=DuracaoEstimadaHoras]');
    var $DuracaoEstimadaMinutos = $('[name=DuracaoEstimadaMinutos]');
    var $Observacoes = $('[name=Observacoes]');
    var $motivoCancelamento = $('[name=CanceladoMotivo]');
    var $motivoComentarios = $('[name=CanceladoComentarios]');
    var $motivoNaoExecutado = $('[name=NaoExecutadoMotivo]');
    var $motivoNaoExecutadoComentarios = $('[name=NaoExecutadoComentarios]');

    var $dlpclResponsavelPP = $('#peoplePickerAbaRespRespDLPCL_TopSpan_EditorInput');
    var $envaseResponsavelAcompanhamento = $('[name=EngenhariaEnvaseAcompanhamento]');
    var $envaseResponsavelPPResp = $('#peoplePickerAbaRespRespEngEnvase_TopSpan_EditorInput');
    var $envaseResponsavelPPGer = $('#peoplePickerAbaRespGerEngEnvase_TopSpan_EditorInput');
    var $engFabResponsavelAcompanhamento = $('[name=EngenhariaFabricacaoAcompanhamen]');
    var $engFabResponsavelPPResp = $('#peoplePickerAbaRespRespEngFabricacao_TopSpan_EditorInput');
    var $engFabResponsavelGer =    $('#peoplePickerAbaRespGerEngFabricacao_TopSpan_EditorInput');
    var $inovDfResponsavelAcompanhamento = $('[name=InovacaoDfAcompanhamento]');
    var $inovDfResponsavelPPResp = $('#peoplePickerAbaRespRespInovDF_TopSpan_EditorInput');
    var $inovDfResponsavelPPGer = $('#peoplePickerAbaRespGerInovDF_TopSpan_EditorInput');
    var $inovDeResponsavelAcompanhamento = $('[name=InovacaoDeAcompanhamento]');
    var $inovDeResponsavelPPResp = $('#peoplePickerAbaRespRespInovDE_TopSpan_EditorInput');
    var $inovDeResponsavelPPGer = $('#peoplePickerAbaRespGerInovDE_TopSpan_EditorInput');
    var $fabricaResponsavelAcompanhamento = $('[name=FabricaAcompanhamento]');
    var $fabricaResponsavelPPCoordProg = $('#peoplePickerAbaRespCoordProgFabrica_TopSpan_EditorInput');
    var $fabricaResponsavelPPCoordMan = $('#peoplePickerAbaRespCoordManFabrica_TopSpan_EditorInput');
    var $fabricaResponsavelPPGer = $('#peoplePickerAbaRespGerFabrica_TopSpan_EditorInput');
    var $qualidadeResponsavelAcompanhamento = $('[name=QualidadeAcompanhamento]');
    var $qualidadeResponsavelPPResp = $('#peoplePickerAbaRespRespQualidade_TopSpan_EditorInput');
    var $qualidadeResponsavelPPGer = $('#peoplePickerAbaRespGerQualidade_TopSpan_EditorInput');
    var $meioAmbienteResponsavelAcompanhamento = $('[name=MeioAmbienteAcompanhamento]');
    var $meioAmbienteResponsavelPPResp = $('#peoplePickerAbaAcRespMeioAmbiente_TopSpan_EditorInput');

    var $envaseAcompAcompanhamento = $('#acRespEngEnvaseAcomp');
    var $envaseAcompPPResp = $('#peoplePickerAbaAcRespEngEnvase_TopSpan_EditorInput');
    var $envaseAcompPPGer = $('#peoplePickerAbaAcGerEngEnvase_TopSpan_EditorInput');
    var $engFabAcompAcompanhamento = $('#acRespEngFabricacaoAcomp');
    var $engFabAcompPPResp = $('#peoplePickerAbaAcRespEngFabricacao_TopSpan_EditorInput');
    var $engFabAcompPPGer = $('#peoplePickerAbaAcGerEngFabricacao_TopSpan_EditorInput');
    var $inovDfAcompAcompanhamento = $('#acRespInovDFAcomp');
    var $inovDfAcompPPResp = $('#peoplePickerAbaAcRespInovDF_TopSpan_EditorInput');
    var $inovDfAcompPPGer = $('#peoplePickerAbaAcGerInovDF_TopSpan_EditorInput');
    var $inovDeAcompAcompanhamento = $('#acRespInovDEAcomp');
    var $inovDeAcompPPResp = $('#peoplePickerAbaAcRespInovDE_TopSpan_EditorInput');
    var $inovDeAcompPPGer = $('#peoplePickerAbaAcGerInovDE_TopSpan_EditorInput');
    var $fabricaAcompAcompanhamento = $('#acRespFabricaAcomp');
    var $fabricaAcompPPCoordProg = $('#peoplePickerAbaAcCoordProgFabrica_TopSpan_EditorInput');
    var $fabricaAcompPPCoordMan = $('#peoplePickerAbaAcCoordManFabrica_TopSpan_EditorInput');
    var $fabricaAcompPPGer = $('#peoplePickerAbaAcGerFabrica_TopSpan_EditorInput');
    var $meioAmbienteAcompAcompanhamento = $('#acRespMeioAmbienteAcomp');
    var $meioAmbienteAcompPPResp = $('#peoplePickerAbaAcRespMeioAmbiente_TopSpan_EditorInput');

    $TipoLote.attr('disabled', true);
    $Fabrica.attr('disabled', true);
    $LinhaEquipamento.attr('disabled', true);
    $CodigoProduto.attr('disabled', true);
    $LinhaProduto.attr('disabled', true);
    $DescricaoProduto.attr('disabled', true);
    $Projeto.attr('disabled', true);
    $CategoriaProjeto.attr('disabled', true);
    $Formula.attr('disabled', true);
    $QuantidadePecas.attr('disabled', true);
    $Motivo.attr('disabled', true);
    $EnvioAmostras.attr('disabled', true);
    $ResponsavelAmostra.attr('disabled', true);
    $QuantidadeAmostra.attr('disabled', true);
    $CentroCusto.attr('disabled', true);
    $GrauComplexidade.attr('disabled', true);
    $InicioProgramado.attr('disabled', true);
    $DuracaoEstimadaHoras.attr('disabled', true);
    $DuracaoEstimadaMinutos.attr('disabled', true);
    $Observacoes.attr('disabled', true);
    $motivoCancelamento.attr('disabled', true);
    $motivoComentarios.attr('disabled', true);
    $motivoNaoExecutado.attr('disabled', true);
    $motivoNaoExecutadoComentarios.attr('disabled', true);
    $dlpclResponsavelPP.attr('disabled', true);
    $envaseResponsavelAcompanhamento.attr('disabled', true);
    $envaseResponsavelPPResp.attr('disabled', true);
    $envaseResponsavelPPGer.attr('disabled', true);
    $engFabResponsavelAcompanhamento.attr('disabled', true);
    $engFabResponsavelPPResp.attr('disabled', true);
    $engFabResponsavelGer.attr('disabled', true);
    $inovDfResponsavelAcompanhamento.attr('disabled', true);
    $inovDfResponsavelPPResp.attr('disabled', true);
    $inovDfResponsavelPPGer.attr('disabled', true);
    $inovDeResponsavelAcompanhamento.attr('disabled', true);
    $inovDeResponsavelPPResp.attr('disabled', true);
    $inovDeResponsavelPPGer.attr('disabled', true);
    $fabricaResponsavelAcompanhamento.attr('disabled', true);
    $fabricaResponsavelPPCoordProg.attr('disabled', true);
    $fabricaResponsavelPPCoordMan.attr('disabled', true);
    $fabricaResponsavelPPGer.attr('disabled', true);
    $qualidadeResponsavelAcompanhamento.attr('disabled', true);
    $qualidadeResponsavelPPResp.attr('disabled', true);
    $qualidadeResponsavelPPGer.attr('disabled', true);
    $meioAmbienteResponsavelAcompanhamento.attr('disabled', true);
    $meioAmbienteResponsavelPPResp.attr('disabled', true);
    $envaseAcompAcompanhamento.attr('disabled', true);
    $envaseAcompPPResp.attr('disabled', true);
    $envaseAcompPPGer.attr('disabled', true);
    $engFabAcompAcompanhamento.attr('disabled', true);
    $engFabAcompPPResp.attr('disabled', true);
    $engFabAcompPPGer.attr('disabled', true);
    $inovDfAcompAcompanhamento.attr('disabled', true);
    $inovDfAcompPPResp.attr('disabled', true);
    $inovDfAcompPPGer.attr('disabled', true);
    $inovDeAcompAcompanhamento.attr('disabled', true);
    $inovDeAcompPPResp.attr('disabled', true);
    $inovDeAcompPPGer.attr('disabled', true);
    $fabricaAcompAcompanhamento.attr('disabled', true);
    $fabricaAcompPPCoordProg.attr('disabled', true);
    $fabricaAcompPPCoordMan.attr('disabled', true);
    $fabricaAcompPPGer.attr('disabled', true);
    $meioAmbienteAcompAcompanhamento.attr('disabled', true);
    $meioAmbienteAcompPPResp.attr('disabled', true);

    $('#pills-analise-qualidade-ger').addClass('disabled');
    bloquearBotoesAbaAnexo();

    Object.keys(aprovacoes).forEach(function (index) {
        var aprovacao = aprovacoes[index];

        if (aprovacao._abaAnaliseId != null) {
            var $abaAnalise = $('#' + aprovacao._abaAnaliseId);
            $abaAnalise.find('[name=Pessoa]').attr('disabled', true);
            $abaAnalise.find('[name=ExecucaoLoteAcompanhada]').attr('disabled', true);
            $abaAnalise.find('[name=Resultado]').attr('disabled', true);
            $abaAnalise.find('[name=ObservacoesAnalise]').attr('disabled', true);
            $abaAnalise.find('[name=ReprovadoMotivo]').attr('disabled', true);
            $abaAnalise.find('[name="MeioAmbienteAbastecimentoVacuo"]').attr('disabled', true);
            $abaAnalise.find('[name="MeioAmbienteAbastecimentoGranel"]').attr('disabled', true);
            $abaAnalise.find('[name="MeioAmbienteAbastecimentoManual"]').attr('disabled', true);
            $abaAnalise.find('[name="MeioAmbienteAcondicionamentoMate"]').attr('disabled', true);
            $abaAnalise.find('[name="MeioAmbienteAcondicionamentoReci"]').attr('disabled', true);
            $abaAnalise.find('[name="MeioAmbienteAumentoGeracaoResidu"]').attr('disabled', true);
            $abaAnalise.find('[name="MeioAmbienteTipoResiduosGeradosJ"]').attr('disabled', true);
            $abaAnalise.find('[name="MeioAmbienteAumentoConsumoAguaLi"]').attr('disabled', true);
            $abaAnalise.find('[name="MeioAmbienteAumentoConsumoEnergi"]').attr('disabled', true);
            $abaAnalise.find('[name="MeioAmbienteAumentoConsumoAguaFa"]').attr('disabled', true);
        }
    });

    switch (formState) {
        case EM_CRIACAO:
        case RASCUNHO_EM_EDICAO:
        case AGENDAMENTO_EM_EDICAO:
            $TipoLote.attr('disabled', false);
            $Fabrica.attr('disabled', false);
            $LinhaEquipamento.attr('disabled', false);
            $CodigoProduto.attr('disabled', false);
            $LinhaProduto.attr('disabled', false);
            $DescricaoProduto.attr('disabled', false);
            $Projeto.attr('disabled', false);
            $CategoriaProjeto.attr('disabled', false);
            $Formula.attr('disabled', false);
            $QuantidadePecas.attr('disabled', false);
            $Motivo.attr('disabled', false);
            $EnvioAmostras.attr('disabled', false);
            $ResponsavelAmostra.attr('disabled', false);
            $QuantidadeAmostra.attr('disabled', false);
            $CentroCusto.attr('disabled', false);
            $GrauComplexidade.attr('disabled', false);
            $InicioProgramado.attr('disabled', false);
            $DuracaoEstimadaHoras.attr('disabled', false);
            $DuracaoEstimadaMinutos.attr('disabled', false);
            $Observacoes.attr('disabled', false);
            $dlpclResponsavelPP.attr('disabled', false);
            $envaseResponsavelAcompanhamento.attr('disabled', false);
            $envaseResponsavelPPResp.attr('disabled', false);
            $envaseResponsavelPPGer.attr('disabled', false);
            $engFabResponsavelAcompanhamento.attr('disabled', false);
            $engFabResponsavelPPResp.attr('disabled', false);
            $engFabResponsavelGer.attr('disabled', false);
            $inovDfResponsavelAcompanhamento.attr('disabled', false);
            $inovDfResponsavelPPResp.attr('disabled', false);
            $inovDfResponsavelPPGer.attr('disabled', false);
            $inovDeResponsavelAcompanhamento.attr('disabled', false);
            $inovDeResponsavelPPResp.attr('disabled', false);
            $inovDeResponsavelPPGer.attr('disabled', false);
            $fabricaResponsavelAcompanhamento.attr('disabled', false);
            $fabricaResponsavelPPCoordProg.attr('disabled', false);
            $fabricaResponsavelPPCoordMan.attr('disabled', false);
            $fabricaResponsavelPPGer.attr('disabled', false);
            $qualidadeResponsavelAcompanhamento.attr('disabled', false);
            $qualidadeResponsavelPPResp.attr('disabled', false);
            $qualidadeResponsavelPPGer.attr('disabled', false);
            $meioAmbienteResponsavelAcompanhamento.attr('disabled', false);
            $meioAmbienteResponsavelPPResp.attr('disabled', false);
            $envaseAcompAcompanhamento.attr('disabled', false);
            $envaseAcompPPResp.attr('disabled', false);
            $envaseAcompPPGer.attr('disabled', false);
            $engFabAcompAcompanhamento.attr('disabled', false);
            $engFabAcompPPResp.attr('disabled', false);
            $engFabAcompPPGer.attr('disabled', false);
            $inovDfAcompAcompanhamento.attr('disabled', false);
            $inovDfAcompPPResp.attr('disabled', false);
            $inovDfAcompPPGer.attr('disabled', false);
            $inovDeAcompAcompanhamento.attr('disabled', false);
            $inovDeAcompPPResp.attr('disabled', false);
            $inovDeAcompPPGer.attr('disabled', false);
            $fabricaAcompAcompanhamento.attr('disabled', false);
            $fabricaAcompPPCoordProg.attr('disabled', false);
            $fabricaAcompPPCoordMan.attr('disabled', false);
            $fabricaAcompPPGer.attr('disabled', false);
            $meioAmbienteAcompAcompanhamento.attr('disabled', false);
            $meioAmbienteAcompPPResp.attr('disabled', false);
            break;
        case RESP_ACOMP_AGENDADO_EM_EDICAO:
            $().SPServices({
                operation: "GetGroupCollectionFromUser",
                userLoginName: $().SPServices.SPGetCurrentUser(),
                async: false,
                completefunc: function (xData, Status) {
                    var $xml = $(xData.responseXML);
                    var envase = listDemaisGrupos[1];
                    var engFabricacao = listDemaisGrupos[2];
                    var fabrica = listDemaisGrupos[3];
                    var inovDe = listDemaisGrupos[4];
                    var inovDf = listDemaisGrupos[5];
                    var meioAmbiente = listDemaisGrupos[6];
                    var qualidade = listDemaisGrupos[7];
                    if (usuarioPertenceAoGrupo($xml, envase)) {
                        $envaseResponsavelAcompanhamento.attr('disabled', false);
                        $envaseResponsavelPPResp.attr('disabled', false);
                        $envaseResponsavelPPGer.attr('disabled', false);
                        $LinhaEquipamento.attr('disabled', false);
                        $Observacoes.attr('disabled', false);
                    }
                    if (usuarioPertenceAoGrupo($xml, engFabricacao)) {
                        $engFabResponsavelAcompanhamento.attr('disabled', false);
                        $engFabResponsavelPPResp.attr('disabled', false);
                        $engFabResponsavelGer.attr('disabled', false);
                        $LinhaEquipamento.attr('disabled', false);
                        $Observacoes.attr('disabled', false);
                    }

                    if (usuarioPertenceAoGrupo($xml, inovDf)) {
                        $inovDfResponsavelAcompanhamento.attr('disabled', false);
                        $inovDfResponsavelPPResp.attr('disabled', false);
                        $inovDfResponsavelPPGer.attr('disabled', false);
                    }

                    if (usuarioPertenceAoGrupo($xml, inovDe)) {
                        $inovDeResponsavelAcompanhamento.attr('disabled', false);
                        $inovDeResponsavelPPResp.attr('disabled', false);
                        $inovDeResponsavelPPGer.attr('disabled', false);
                    }

                    if (usuarioPertenceAoGrupo($xml, fabrica)) {
                        $fabricaResponsavelAcompanhamento.attr('disabled', false);
                        $fabricaResponsavelPPCoordProg.attr('disabled', false);
                        $fabricaResponsavelPPCoordMan.attr('disabled', false);
                        $fabricaResponsavelPPGer.attr('disabled', false);
                    }

                    if (usuarioPertenceAoGrupo($xml, qualidade)) {
                        $qualidadeResponsavelAcompanhamento.attr('disabled', false);
                        $qualidadeResponsavelPPResp.attr('disabled', false);
                        $qualidadeResponsavelPPGer.attr('disabled', false);
                    }

                    if (usuarioPertenceAoGrupo($xml, meioAmbiente)) {
                        $meioAmbienteResponsavelAcompanhamento.attr('disabled', false);
                        $meioAmbienteResponsavelPPResp.attr('disabled', false);
                    }
                }
            });
            break;
        case EM_CANCELAMENTO:
            $('[name=CanceladoMotivo]').attr('disabled', false);
            $('[name=CanceladoComentarios]').attr('disabled', false);
            break;
        case EM_NAO_EXECUCAO:
            $('[name=NaoExecutadoMotivo]').attr('disabled', false);
            $('[name=NaoExecutadoComentarios]').attr('disabled', false);
            break;
        case EM_REGISTRO_DE_ANALISE:
            $().SPServices({
                operation: "GetGroupCollectionFromUser",
                userLoginName: $().SPServices.SPGetCurrentUser(),
                async: false,
                completefunc: function (xData, Status) {
                    var $xml = $(xData.responseXML);
                    if (usuarioPertenceAoGrupo($xml, listDemaisGrupos[0])) {
                        $envaseResponsavelAcompanhamento.attr('disabled', false);
                        $envaseResponsavelPPResp.attr('disabled', false);
                        $envaseResponsavelPPGer.attr('disabled', false);
                        $engFabResponsavelAcompanhamento.attr('disabled', false);
                        $engFabResponsavelPPResp.attr('disabled', false);
                        $engFabResponsavelGer.attr('disabled', false);
                        $inovDfResponsavelAcompanhamento.attr('disabled', false);
                        $inovDfResponsavelPPResp.attr('disabled', false);
                        $inovDfResponsavelPPGer.attr('disabled', false);
                        $inovDeResponsavelAcompanhamento.attr('disabled', false);
                        $inovDeResponsavelPPResp.attr('disabled', false);
                        $inovDeResponsavelPPGer.attr('disabled', false);
                        $fabricaResponsavelAcompanhamento.attr('disabled', false);
                        $fabricaResponsavelPPCoordProg.attr('disabled', false);
                        $fabricaResponsavelPPCoordMan.attr('disabled', false);
                        $fabricaResponsavelPPGer.attr('disabled', false);
                        $qualidadeResponsavelAcompanhamento.attr('disabled', false);
                        $qualidadeResponsavelPPResp.attr('disabled', false);
                        $qualidadeResponsavelPPGer.attr('disabled', false);
                        $meioAmbienteResponsavelAcompanhamento.attr('disabled', false);
                        $meioAmbienteResponsavelPPResp.attr('disabled', false);
                    }
                }
            });

            var mostrarAbaQualidadeGerente = true;

            Object.keys(aprovacoes).forEach(function (index) {
                var aprovacao = aprovacoes[index];

                if (aprovacao._abaAnaliseId != null) {
                    var $abaAnalise = $('#' + aprovacao._abaAnaliseId);
                    if (CarregarUsuarioAtual().id == FiltrarIdPorPessoaId(aprovacao.Pessoa) &&
                    ['Pendente', 'Rascunho'].indexOf(aprovacao.Resultado) != -1) {
                        $abaAnalise.find('[name=ExecucaoLoteAcompanhada]').attr('disabled', false);
                        $abaAnalise.find('[name=Resultado]').attr('disabled', false);
                        $abaAnalise.find('[name=ObservacoesAnalise]').attr('disabled', false);
                        $abaAnalise.find('[name="MeioAmbienteAbastecimentoVacuo"]').attr('disabled', false);
                        $abaAnalise.find('[name="MeioAmbienteAbastecimentoGranel"]').attr('disabled', false);
                        $abaAnalise.find('[name="MeioAmbienteAbastecimentoManual"]').attr('disabled', false);
                        $abaAnalise.find('[name="MeioAmbienteAcondicionamentoMate"]').attr('disabled', false);
                        $abaAnalise.find('[name="MeioAmbienteAcondicionamentoReci"]').attr('disabled', false);
                        $abaAnalise.find('[name="MeioAmbienteAumentoGeracaoResidu"]').attr('disabled', false);
                        $abaAnalise.find('[name="MeioAmbienteTipoResiduosGeradosJ"]').attr('disabled', false);
                        $abaAnalise.find('[name="MeioAmbienteAumentoConsumoAguaLi"]').attr('disabled', false);
                        $abaAnalise.find('[name="MeioAmbienteAumentoConsumoEnergi"]').attr('disabled', false);
                        $abaAnalise.find('[name="MeioAmbienteAumentoConsumoAguaFa"]').attr('disabled', false);
                        $abaAnalise.find('[name="InserirAnexo"]').attr('disabled', false);
                    }

                    if (mostrarAbaQualidadeGerente && index != 'Qualidade - Gerente' && !$abaAnalise.find('[name=Resultado] :selected').val().startsWith('Aprovado')) {
                        mostrarAbaQualidadeGerente = false;
                    }
                }
            });

            if (mostrarAbaQualidadeGerente) $('#pills-analise-qualidade-ger').removeClass('disabled');

            break;
    }
}

function ModificarStatusPorFormState(formState) {
    var $status = $('select#status');

    switch (formState) {
        case AGENDADO:
            $status.val(AGENDADO);
            break;
        case REGISTRO_DE_ANALISE:
            $status.val(REGISTRO_DE_ANALISE);
            break;
        case EM_CANCELAMENTO:
            $status.val(CANCELADO);
            break;
        case EM_NAO_EXECUCAO:
            $status.val(LOTE_NAO_EXECUTADO);
            break;
        case APROVADO:
            $status.val(APROVADO);
            break;
        case REPROVADO:
            $status.val(REPROVADO);
            break;
        case EM_CRIACAO:
            $status.val("");
            break;
        case RASCUNHO:
            $status.val(RASCUNHO);
            break;
        case RASCUNHO_EM_EDICAO:
            $status.val(RASCUNHO);
            break;
        case EM_REGISTRO_DE_ANALISE:
            if ($("#qualidadeGerResultado :selected").val().startsWith('Aprovado')) {
                $status.val(APROVADO);
            } else {
                $status.val(REGISTRO_DE_ANALISE);
            }
            break;
    }
}

function ModificarFormState(formState) {
    state = formState;
    ModificarBotoesPorFormState(formState);
    ModificarCamposPorFormState(formState);
    ModificarAbasPorFormState(formState);
}

function ModificarAbasPorFormState(formState) {
    $('#pills-analises-tab').addClass('disabled');
    switch (formState) {
        case EM_CANCELAMENTO:
            $('#justificativaCancelamento').removeClass('d-md-none');
            $("#pills-justificativa-tab").removeClass("disabled");
            $("#pills-justificativa-tab").tab('show');
            break;
        case CANCELADO:
            $('#justificativaCancelamento').removeClass('d-md-none');
            $("#pills-justificativa-tab").removeClass("disabled");
            break;
        case EM_NAO_EXECUCAO:
            $('#justificativaNaoExecutado').removeClass('d-md-none');
            $("#pills-justificativa-tab").removeClass("disabled");
            $("#pills-justificativa-tab").tab('show');
            break;
        case LOTE_NAO_EXECUTADO:
            $('#justificativaNaoExecutado').removeClass('d-md-none');
            $("#pills-justificativa-tab").removeClass("disabled");
            break;
        case EM_CRIACAO:
            break;
        case REGISTRO_DE_ANALISE:
        case EM_REGISTRO_DE_ANALISE:
            $('#pills-analises-tab').removeClass('disabled');
            break;
        case REPROVADO:
        case APROVADO:
            $('#pills-analises-tab').removeClass('disabled');
            $('#pills-analise-qualidade-ger').removeClass('disabled');
            break;
    }
}

function ModificarAbasPorTipoDeLote(tipoDeLote) {
    $('#pills-tab-qualidade-resp').hide();
    $('#pills-tab-eng-envase-resp').hide();
    $('#pills-tab-eng-fabricacao-resp').hide();
    $('#pills-tab-inov-df-resp').hide();
    $('#pills-tab-inov-de-resp').hide();
    $('#pills-tab-fabrica-resp').hide();
    $('#pills-tab-meio-ambiente-resp').hide();
    $('#pills-analise-qualidade-ger').hide();

    $('#brindeMeioAmbiente').hide();
    $('#envaseMeioAmbiente').hide();
    $('#fabricacaoMeioAmbiente').hide();

    switch (tipoDeLote) {
        case 'Brinde':
            $("#pills-responsaveis-tab").removeClass("disabled");
            $("#pills-acompanhamento-tab").removeClass("disabled");

            $("#pills-dlpcl-tab").show();
            $("#pills-dlpcl-tab").focus();
            $("#pills-eng-envase-tab").hide();
            $("#pills-eng-fabricacao-tab").hide();
            $("#pills-inov-df-tab").hide();
            $("#pills-inov-de-tab").hide();
            $("#pills-qualidade-tab").show();
            $("#pills-fabrica-tab").hide();

            $("#pills-dlpcl-acomp-tab").hide();
            $("#pills-eng-envase-acomp-tab").show();
            $("#pills-eng-envase-acomp-tab").tab('show');
            $("#pills-eng-fabricacao-acomp-tab").show();
            $("#pills-inov-df-acomp-tab").show();
            $("#pills-inov-de-acomp-tab").show();
            $("#pills-qualidade-acomp-tab").hide();
            $("#pills-fabrica-acomp-tab").show();
            $("#pills-meioambiente-acomp-tab").show();

            $('#pills-analise-qualidade-ger').show();
            $('#brindeMeioAmbiente').show();
            break;
        case 'Envase':
            $("#pills-responsaveis-tab").removeClass("disabled");
            $("#pills-acompanhamento-tab").removeClass("disabled");

            $("#pills-dlpcl-tab").show();
            $("#pills-dlpcl-tab").focus();
            $("#pills-eng-envase-tab").show();
            $("#pills-eng-fabricacao-tab").hide();
            $("#pills-inov-df-tab").hide();
            $("#pills-inov-de-tab").show();
            $("#pills-qualidade-tab").show();
            $("#pills-fabrica-tab").show();

            $("#pills-dlpcl-acomp-tab").hide();
            $("#pills-eng-envase-acomp-tab").hide();
            $("#pills-eng-fabricacao-acomp-tab").show();
            $("#pills-eng-fabricacao-acomp-tab").tab('show');
            $("#pills-inov-df-acomp-tab").show();
            $("#pills-inov-de-acomp-tab").hide();
            $("#pills-qualidade-acomp-tab").hide();
            $("#pills-fabrica-acomp-tab").hide();
            $("#pills-meioambiente-acomp-tab").show();

            $('#pills-analise-qualidade-ger').show();
            $('#envaseMeioAmbiente').show();
            break;
        case 'Fabricação':
            $("#pills-responsaveis-tab").removeClass("disabled");
            $("#pills-acompanhamento-tab").removeClass("disabled");

            $("#pills-dlpcl-tab").show();
            $("#pills-dlpcl-tab").focus();
            $("#pills-eng-envase-tab").hide();
            $("#pills-eng-fabricacao-tab").show();
            $("#pills-inov-df-tab").show();
            $("#pills-inov-de-tab").hide();
            $("#pills-qualidade-tab").show();
            $("#pills-fabrica-tab").show();

            $("#pills-dlpcl-acomp-tab").hide();
            $("#pills-eng-envase-acomp-tab").show();
            $("#pills-eng-envase-acomp-tab").tab("show");
            $("#pills-eng-fabricacao-acomp-tab").hide();
            $("#pills-inov-df-acomp-tab").hide();
            $("#pills-inov-de-acomp-tab").show();
            $("#pills-qualidade-acomp-tab").hide();
            $("#pills-fabrica-acomp-tab").hide();
            $("#pills-meioambiente-acomp-tab").show();

            $('#pills-analise-qualidade-ger').show();
            $('#fabricacaoMeioAmbiente').show();
            break;
        default:
            $("#pills-responsaveis-tab").addClass("disabled");
            $("#pills-acompanhamento-tab").addClass("disabled");

            $("#pills-dlpcl-tab").hide();
            $("#pills-eng-envase-tab").hide();
            $("#pills-eng-fabricacao-tab").hide();
            $("#pills-inov-df-tab").hide();
            $("#pills-inov-de-tab").hide();
            $("#pills-qualidade-tab").hide();
            $("#pills-fabrica-tab").hide();

            $("#pills-dlpcl-acomp-tab").hide();
            $("#pills-eng-envase-acomp-tab").hide();
            $("#pills-eng-fabricacao-acomp-tab").hide();
            $("#pills-inov-df-acomp-tab").hide();
            $("#pills-inov-de-acomp-tab").hide();
            $("#pills-qualidade-acomp-tab").hide();
            $("#pills-fabrica-acomp-tab").hide();
            $("#pills-meioambiente-acomp-tab").hide();

            $('#envaseMeioAmbiente').hide();
            $('#fabricaMeioAmbiente').hide();

            break;
    }

    if ($('#nav-tab .show.active').is('.disabled')) {
        $('#pills-produto-tab').tab('show');
    }
}

function QueryGroupIdByName(groupName) {
    var $promise = $.Deferred();
    var ctx = SP.ClientContext.get_current();
    var group = ctx.get_web().get_siteGroups().getByName(groupName);
    ctx.load(group);

    ctx.executeQueryAsync(function () {
        $promise.resolve(group.get_id());
    }, function (sender, args) {
        $promise.reject();
    });

    return $promise;
}

function CarregarUsuarioAtual() {
    var usuario = $().SPServices.SPGetCurrentUser({
        fieldNames: [
            'ID',
            'Name',
            'Title',
            'Email',
        ]
    });

    return {
        id: usuario.ID,
        loginName: usuario.Name,
        email: usuario.Email,
        nome: usuario.Title,
    };
}

function CarregarUsuarioPorLoginName(loginName) {
    var $promise = $.Deferred();
    var context = SP.ClientContext.get_current();
    var usuario = context.get_web().ensureUser(loginName);
    context.load(usuario);

    context.executeQueryAsync(function () {
        $promise.resolve({
            id: usuario.get_id(),
            loginName: usuario.get_loginName(),
            nome: usuario.get_title(),
            email: usuario.get_email()
        });
    }, function (sender, args) {
        $promise.reject({
            errorCode: args.get_errorCode(),
            errorMessage: args.get_message()
        });
    });

    return $promise;
}

function PreencherPeoplePicker(peoplePickerId, usuario) {
    var peoplePicker = PegarPeoplePickerPorId(peoplePickerId);
    peoplePicker.DeleteProcessedUser();
    peoplePicker.AddUnresolvedUser(GerarISPClientPeoplePickerEntityPorUsuario(usuario), true);
}

function PreencherResponsavelDlPcl() {
    PreencherPeoplePicker('peoplePickerAbaRespRespDLPCL', CarregarUsuarioAtual());
}

function RegistrarBindings() {
    var $tipoLote = $("select#tipoDeLote");
    var $fabrica = $("select#fabrica");
    var $linhaEquipamento = $("select#linhaEquipamento");

    var $acRespEngEnvaseAcomp = $("input[type=checkbox]#acRespEngEnvaseAcomp");
    var $acRespEngFabricacaoAcomp = $("input[type=checkbox]#acRespEngFabricacaoAcomp");
    var $acRespInovDFAcomp = $("input[type=checkbox]#acRespInovDFAcomp");
    var $acRespInovDEAcomp = $("input[type=checkbox]#acRespInovDEAcomp");
    var $acRespFabricaAcomp = $("input[type=checkbox]#acRespFabricaAcomp");
    var $acRespMeioAmbienteAcomp = $("input[type=checkbox]#acRespMeioAmbienteAcomp");

    $tipoLote.change(function () {
        ModificarAbasPorTipoDeLote(this.value);
        DispararCarregarLinhasEquipamentos();
    });

    $acRespEngEnvaseAcomp.change(function () {
        if ($acRespEngEnvaseAcomp.prop('checked')) {
            $("#AbaAcRespsEngEnvase").show();
        }
        else {
            $("#AbaAcRespsEngEnvase").hide();
        }
    });

    $acRespEngFabricacaoAcomp.change(function () {
        if ($acRespEngFabricacaoAcomp.prop('checked')) {
            $("#AbaAcRespsEngFabricacao").show();
        }
        else {
            $("#AbaAcRespsEngFabricacao").hide();
        }
    });

    $acRespInovDFAcomp.change(function () {
        if ($acRespInovDFAcomp.prop('checked')) {
            $("#AbaAcRespsInovDF").show();
        }
        else {
            $("#AbaAcRespsInovDF").hide();
        }
    });

    $acRespInovDEAcomp.change(function () {
        if ($acRespInovDEAcomp.prop('checked')) {
            $("#AbaAcRespsInovDE").show();
        }
        else {
            $("#AbaAcRespsInovDE").hide();
        }
    });

    $acRespFabricaAcomp.change(function () {
        if ($acRespFabricaAcomp.prop('checked')) {
            $("#AbaAcRespsFabrica").show();
        }
        else {
            $("#AbaAcRespsFabrica").hide();
        }
    });

    $acRespMeioAmbienteAcomp.change(function () {
        if ($acRespMeioAmbienteAcomp.prop('checked')) {
            $("#AbaAcRespsMeioAmbiente").show();
        } else {
            $("#AbaAcRespsMeioAmbiente").hide();
        }
    });

    $fabrica.change(DispararCarregarLinhasEquipamentos);

    $linhaEquipamento.change(function () {
        var valSelected = $("select#linhaEquipamento").val();
        if (valSelected) {
            CarregarLinhasEquipamentosById(valSelected)
        }
    });

    $("#produtoEnvioAmostras").change(function () {
        if (this.checked) {
            $("#formResponsavelAmostra").show();
        } else {
            $("#formResponsavelAmostra").hide();
            $("#produtoResponsavelAmostra").text('');
            $("#produtoQuantidadeAmostra").text('');
        }
    });

    espelharCheckBox('#acRespQualidade', '#acRespQualidadeAcomp');
    espelharCheckBox('#acRespEngEnvase', '#acRespEngEnvaseAcomp');
    espelharCheckBox('#acRespEngfabricacao', '#acRespEngFabricacaoAcomp');
    espelharCheckBox('#acRespInofDF', '#acRespInovDFAcomp');
    espelharCheckBox('#acRespInofDE', '#acRespInovDEAcomp');
    espelharCheckBox('#acRespFabrica', '#acRespFabricaAcomp');

    $('[name="Resultado"]').change(function () {
        var $this = $(this);
        var $tab = $this.parents('.tab-pane[role="tabpanel"]');

        if ($this.val() == 'Reprovado') {
            $tab.find('[name="ReprovadoMotivo"]').prop('disabled', false);
        } else {
            $tab.find('[name="ReprovadoMotivo"]').prop('disabled', true);
        }
    });
}

function espelharCheckBox(checkA, checkB) {
    $(checkA).change(function (event, isReflexo) {
        $(checkB).prop('checked', this.checked);

        if (isReflexo == undefined) {
            $(checkB).trigger('change', [true]);
        }
    });

    $(checkB).change(function (event, isReflexo) {
        $(checkA).prop('checked', this.checked);

        if (isReflexo == undefined) {
            $(checkA).trigger('change', [true]);
        }
    });
}

function ResetarAgendamento() {
    var $labelQuantidadePecas = $('label[for="produtoQuantidade"]');
    $labelQuantidadePecas.text("Quantidade (peças)");

    $('#main [name].salvar-campo').each(function () {
        var $this = $(this);

        if ($this.is('[type=checkbox]')) {
            $this.prop('checked', false);
        } else if ($this.is('select') && !$this.is('select#status')) {
            $this.val('Selecione uma opção');
        } else {
            $this.val('');
        }

        $this.change();
    });

    PreencherResponsavelDlPcl();
}

function SalvarAgendamento() {
    var id = $('input[name="ID"]').val();

    if (id) {
        return AtualizarAgendamento(id).then(function (response) {
            return CarregarAgendamento(response.record.attr('ows_ID'));
        });
    }

    return InserirAgendamento().then(function (response) {
        return CarregarAgendamento(response.record.attr('ows_ID'));
    });

}

function InitializeAllPeoplePickers() {
    return $.when(
        //Aba Responsáveis Peoplepicker
        InitializePeoplePicker('peoplePickerAbaRespRespDLPCL', 'Área - DL PCL'),
        InitializePeoplePicker('peoplePickerAbaRespRespEngEnvase', 'Área - Engenharia de Envase'),
        InitializePeoplePicker('peoplePickerAbaRespGerEngEnvase', 'Área - Engenharia de Envase'),
        InitializePeoplePicker('peoplePickerAbaRespRespEngFabricacao', 'Área - Engenharia de Fabricação'),
        InitializePeoplePicker('peoplePickerAbaRespGerEngFabricacao', 'Área - Engenharia de Fabricação'),
        InitializePeoplePicker('peoplePickerAbaRespRespInovDF', 'Área - Inovação DF'),
        InitializePeoplePicker('peoplePickerAbaRespGerInovDF', 'Área - Inovação DF'),
        InitializePeoplePicker('peoplePickerAbaRespRespInovDE', 'Área - Inovação DE'),
        InitializePeoplePicker('peoplePickerAbaRespGerInovDE', 'Área - Inovação DE'),
        InitializePeoplePicker('peoplePickerAbaRespRespQualidade', 'Área - Qualidade'),
        InitializePeoplePicker('peoplePickerAbaRespGerQualidade', 'Área - Qualidade'),
        InitializePeoplePicker('peoplePickerAbaRespCoordProgFabrica', 'Área - Fábrica'),
        InitializePeoplePicker('peoplePickerAbaRespCoordManFabrica', 'Área - Fábrica'),
        InitializePeoplePicker('peoplePickerAbaRespGerFabrica', 'Área - Fábrica'),
        //Aba Acompanhamentos
        InitializePeoplePicker('peoplePickerAbaAcRespEngFabricacao', 'Área - Engenharia de Fabricação'),
        InitializePeoplePicker('peoplePickerAbaAcGerEngFabricacao', 'Área - Engenharia de Fabricação'),
        InitializePeoplePicker('peoplePickerAbaAcRespInovDF', 'Área - Inovação DF'),
        InitializePeoplePicker('peoplePickerAbaAcGerInovDF', 'Área - Inovação DF'),
        InitializePeoplePicker('peoplePickerAbaAcRespEngEnvase', 'Área - Engenharia de Envase'),
        InitializePeoplePicker('peoplePickerAbaAcGerEngEnvase', 'Área - Engenharia de Envase'),
        InitializePeoplePicker('peoplePickerAbaAcRespInovDE', 'Área - Inovação DE'),
        InitializePeoplePicker('peoplePickerAbaAcGerInovDE', 'Área - Inovação DE'),
        InitializePeoplePicker('peoplePickerAbaAcCoordProgFabrica', 'Área - Fábrica'),
        InitializePeoplePicker('peoplePickerAbaAcCoordManFabrica', 'Área - Fábrica'),
        InitializePeoplePicker('peoplePickerAbaAcGerFabrica', 'Fábrica - Gerente'),
        InitializePeoplePicker('peoplePickerAbaAcRespMeioAmbiente', 'Área - Meio Ambiente')
    );
}

function InitializePeoplePicker(elementId, groupName) {
    var $promise = $.Deferred();
    var $groupIdPromise = QueryGroupIdByName(groupName);
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = false;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '280px';

    $groupIdPromise.then(function (groupId) {
        schema['SharePointGroupID'] = groupId;
        SPClientPeoplePicker_InitStandaloneControlWrapper(elementId, null, schema);
        $("#" + elementId + '_TopSpan').addClass('form-control');
        $promise.resolve();
    }).fail(function () {
        SPClientPeoplePicker_InitStandaloneControlWrapper(elementId, null, schema);
        $("#" + elementId + '_TopSpan').addClass('form-control');
        $promise.resolve();
    });

    return $promise;
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function DerivarAgendamento() {
    $('#inputId').val("");
    $('#codigoProduto').val("");
    $('#produtoDescricao').val("");
    ModificarStatusPorFormState(EM_CRIACAO);
    ModificarFormState(EM_CRIACAO);
    window.history.pushState("object", '', _spPageContextInfo.siteAbsoluteUrl + "/Lists/Agendamentos/NewForm.aspx");
}

function ValidarQtdPecas() {
    var quantidadePecas = document.getElementById('produtoQuantidade').value;

}

function RegistrarBotoes() {
    var $btnSalvar = $('.btn-salvar');
    $btnSalvar.click(function () {
        if (ValidarStatusECamposObrigatorios()) {
            SalvarAgendamento().then(function () {
                var id = $('input[name="ID"]').val();
                window.history.pushState('Object', '', _spPageContextInfo.siteAbsoluteUrl + '/Lists/Agendamentos/DispForm.aspx?ID=' + id);
                bloquearBotoesAbaAnexo();

                if (id) {
                    alert('Alterações salvas');
                } else {
                    alert('Agendamento salvo');
                }
            }).fail(function (response) {
                alert('Ops., algo deu errado. Mensagem: ' + response.errorText);
            });

            return false;
        }
    });

    $('.btn-carregar').click(function () {
        EscolherAgendamento();
    });

    $('.btn-agendar').click(function () {
        if (ValidarAgendamento()) {
            ModificarFormState(AGENDADO);
            SalvarAgendamento();
        }
    });

    $('.btn-executado').click(function () {
        ModificarFormState(REGISTRO_DE_ANALISE);
        SalvarAgendamento();
    });

    $('.btn-derivar').click(function () {
        $btnSalvar.show();
        DerivarAgendamento();
    });

    $('.btn-cancelar-agendamento').click(function () {
        ModificarFormState(EM_CANCELAMENTO);
    });

    $('.btn-nao-executado').click(function () {
        ModificarFormState(EM_NAO_EXECUCAO);
    });

    $('.btn-editar').click(function () {
        let status = $('select#status').val();
        if (status == RASCUNHO) {
            ModificarFormState(RASCUNHO_EM_EDICAO);
        } else if (status == AGENDADO) {
            ModificarFormState(AGENDAMENTO_EM_EDICAO);
        } else if(status == REGISTRO_DE_ANALISE) {
            ModificarFormState(EM_REGISTRO_DE_ANALISE);
        }
    });

    $('.btn-editar-resp-acomp').click(function () {
        ModificarFormState(RESP_ACOMP_AGENDADO_EM_EDICAO);
    });

    $('.btn-abandonar').click(function () {
        ModificarFormState($('select#status').val());
    });

    $('.btn-reagendar').click(function () {
        ModificarFormState(RASCUNHO_EM_EDICAO);
    });
}

function VerificarGrupoDlPclOuPlantaPiloto() {
    var result = false;
    $().SPServices({
        operation: "GetGroupCollectionFromUser",
        userLoginName: $().SPServices.SPGetCurrentUser(),
        async: false,
        completefunc: function (xData, Status) {
            $.each(listGruposAdm, function (k, v) {
                if (($(xData.responseXML).find("Group[Name='" + v + "']").length >= 1)) {
                    result = true;
                    return false;
                } else {
                    result = false;
                }
            });

        }
    });

    return result;
}

function ValidarLinhaEquipamento() {
    var valSelected = $("select#linhaEquipamento").val();
    if (valSelected) {
        var mensagem = BuscarMinimoEMaximoPecas(valSelected);
        $('input#produtoQuantidade').attr("title", mensagem);
    } else {
        return false;
    }
}

function BuscarMinimoEMaximoPecas(linhaEquipamentoId) {
    var $promise = $.Deferred();
    var $minimoPecas = "";
    var $maximoPecas = "";
    var produtoqtd = $('input#produtoQuantidade').val();
    $().SPServices({
        async: false,
        operation: 'GetListItems',
        listName: 'Linhas e Equipamentos',
        CAMLQuery: '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Number">' + linhaEquipamentoId + '</Value></Eq></Where></Query>',
        CAMLViewFields: '<ViewFields><FieldRef Name="Title" /><FieldRef Name="ID" /></ViewFields>',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return false;
            }

            $(Data.responseXML).SPFilterNode("z:row").each(function () {
                $minimoPecas = AtributoNumber($(this).attr("ows_CapacidadeMin"));
                $maximoPecas = AtributoNumber($(this).attr("ows_CapacidadeMax"));
            });

            $promise.resolve();
        }
    });

    if (produtoqtd < $minimoPecas) {

        NotificarErroValidacao('text', 'input#produtoQuantidade', '', '');
        return "Valor digitado está fora da capacidade do equipamento";

    } else if (produtoqtd > $maximoPecas ) {

        NotificarErroValidacao('text', 'input#produtoQuantidade', '', '');
        return "Valor digitado está fora da capacidade do equipamento";

    } else {
        $('input#produtoQuantidade').removeAttr("title");
        return null;
    }
}

function verificarErros() {
    var $campos = {
        tipoDeLote,
        fabrica,
        linhaEquipamento,
        codigoProduto,
        linhaDoProduto,
        produtoDescricao,
        produtoProjeto,
        categoriaDoProjeto,
        produtoFormula,
        produtoQuantidade,
        motivo,
        agendamentoCentroCusto,
        grauComplexidade,
        agendamentoDataInicioProgramado,
        agendamentoDuracaoHoras,
        agendamentoDuracaoMinutos,
        agendamentoFim
    };

    var erro = 0;

    function isDateLessThanCurrent() {
        var SelectedDate = new Date($('input#agendamentoDataInicioProgramado').val().substring(6, 10), $('input#agendamentoDataInicioProgramado').val().substring(3, 5) - 1, $('input#agendamentoDataInicioProgramado').val().substring(0, 2));
        var CurrentDateTime = new Date();
        var CurrentDate = new Date(CurrentDateTime.getFullYear(), CurrentDateTime.getMonth(), CurrentDateTime.getDate());
        return CurrentDate > SelectedDate;
    }

    var itens;
    for (itens in $campos) {
        var $atributo =  $('#'+itens);
        var $classe = $atributo.attr('class');

        if ($classe.indexOf('tom-selec') > 0) {
            if ($atributo.children('option:selected').val() === 'Selecione uma opção') {
                var $tabItem = $atributo.parents('div.tab-pane');
                var tabId = $tabItem.attr('id');
                var $tabContent = $tabItem.parents('div.tab-content');
                var $link = $tabContent.parent().find('ul.nav.nav-tabs li a[href="#' + tabId + '"]');
                $link.tab('show');
                $atributo.first().focus();
                erro = 1;
                break;
            }
        } else if ($atributo.val().length == 0 || itens === 'agendamentoDataInicioProgramado' && isDateLessThanCurrent()) {
            var $tabItem = $atributo.parents('div.tab-pane');
            var tabId = $tabItem.attr('id');
            var $tabContent = $tabItem.parents('div.tab-content');
            var $link = $tabContent.parent().find('ul.nav.nav-tabs li a[href="#' + tabId + '"]');
            $link.tab('show');
            $atributo.focus();
            erro = 1;
            break;
        }
    }

    var $tipoLote = $("select#tipoDeLote");
    var listaPeoplePicker = GetResponsaveisPorTipoDeLote($tipoLote.val());

    if (erro == 0) {
        for (var i = 0; i < listaPeoplePicker.length; i++) {
            var pickerTopSpan = PegarPeoplePickerPorId(listaPeoplePicker[i].peoplePickerId).TopLevelElementId;
            var $atributo = $('#'+pickerTopSpan);

            if (SPClientPeoplePicker.SPClientPeoplePickerDict[pickerTopSpan].HasInputError || !SPClientPeoplePicker.SPClientPeoplePickerDict[pickerTopSpan].HasResolvedUsers()) {
                var $tabItem = $atributo.parents('div.tab-pane');
                var $tabPai = $tabItem.parents('div.tab-pane');
                var tabId = $tabItem.attr('id');
                var tabPaiId = $tabPai.attr('id');
                var $tabContent = $tabItem.parents('div.tab-content');
                var $tabContentPai = $tabPai.parents('div.tab-content');
                var $link = $tabContent.parent().find('ul.nav.nav-tabs li a[href="#' + tabId + '"]');
                var $linkPai = $tabContentPai.parent().find('ul.nav.nav-tabs li a[href="#' + tabPaiId + '"]');
                $linkPai.tab('show');
                $link.tab('show');
                $atributo.focus();
                break;
            }
        }
    }
}

function InicializarHistorico() {
    var $tabs = $('<ul class="nav nav-tabs" role="tablist"></ul>');
    var $liAgendamento = $('<li class="nav-item"><a class="nav-link active" data-toggle="pill" role="tab">Agendamento</a></li>');

    $liAgendamento.click(function () {
        CarregarHistoricoPorAgendamento($('#inputId').val());
    });

    $tabs.append($liAgendamento);

    Object.keys(aprovacoes).forEach(function (i) {
        var $liResponsavel = $('<li class="nav-item"><a class="nav-link" data-toggle="pill" role="tab">' + aprovacoes[i].TipoResponsavel + '</a></li>');

        $liResponsavel.click(function () {
            CarregarHistoricoPorAgendamentoResponsavel(aprovacoes[i].ID);
        });

        $tabs.append($liResponsavel);
    });

    $historicoIframe = $('<iframe width="100%" height="500"></iframe>');

    $('#historico')
        .empty()
        .append($tabs)
        .append($historicoIframe);

    $historicoIframe.on('load', function () {
        var frameWindow = $historicoIframe[0].contentWindow;
        var frameDocument = frameWindow.document;

        $(frameDocument).ready(function () {
            $(frameDocument).find('body').css('overflow', 'auto');

            $(frameDocument).find('table .ms-vb a').click(function () {
                return false;
            });

            frameWindow.oBuildMenu = frameWindow.BuildMenu;
            frameWindow.ViewVersion = function () {};

            frameWindow.BuildMenu = function (a, f) {
                var menu = frameWindow.oBuildMenu(a, f);
                $(menu).find('#ID_ViewVersion').remove();

                return menu;
            }
        });
    });
}

function CarregarHistorico(lista, id) {
    $historicoIframe[0].contentWindow.document.location.href = _spPageContextInfo.siteAbsoluteUrl + '/_layouts/15/Versions.aspx?list=' + lista + '&ID=' + id + '&IsDlg=1';
}

function CarregarHistoricoPorAgendamento(id) {
    CarregarHistorico('{8FEC2F9D-C97E-42EF-9B2C-0845CF7B2A52}', id);
}

function CarregarHistoricoPorAgendamentoResponsavel(id) {
    CarregarHistorico('{ed4669ee-2393-484a-a4c6-3068e8d6e004}', id);
}

function carregarBotoesAnexo() {
    var tableName = 'Agendamentos - Responsáveis';
    var qualidResp = document.getElementById('txtAtt-tab-analise-qualidade');

    qualidResp.addEventListener('change', function () {
        AddAttachments(tableName, ProcurarAprovacaoPorAbaAnaliseId($(qualidResp).closest('div.tab-pane').attr('id')).ID,qualidResp);
    });

    var qualidGer = document.getElementById('txtAtt-tab-analise-qualidade-ger');

    qualidGer.addEventListener('change', function () {
        AddAttachments(tableName, ProcurarAprovacaoPorAbaAnaliseId($(qualidGer).closest('div.tab-pane').attr('id')).ID, qualidGer);
    });

    var envaseR = document.getElementById('txtAtt-tab-analise-envase');

    envaseR.addEventListener('change', function () {
        AddAttachments(tableName, ProcurarAprovacaoPorAbaAnaliseId($(envaseR).closest('div.tab-pane').attr('id')).ID, envaseR);
    });

    var fabricacao = document.getElementById('txtAtt-tab-analise-fabricacao');

    fabricacao.addEventListener('change', function () {
        AddAttachments(tableName, ProcurarAprovacaoPorAbaAnaliseId($(fabricacao).closest('div.tab-pane').attr('id')).ID, fabricacao);
    });

    var fabrica = document.getElementById('txtAtt-tab-analise-fabrica');

    fabrica.addEventListener('change', function () {
        AddAttachments(tableName, ProcurarAprovacaoPorAbaAnaliseId($(fabrica).closest('div.tab-pane').attr('id')).ID, fabrica);
    });

    var inovde = document.getElementById('txtAtt-tab-analise-inovDe');

    inovde.addEventListener('change', function () {
        AddAttachments(tableName, ProcurarAprovacaoPorAbaAnaliseId($(inovde).closest('div.tab-pane').attr('id')).ID, inovde);
    });

    var inovdfResp = document.getElementById('txtAtt-tab-analise-inovDf');

    inovdfResp.addEventListener('change', function () {
        AddAttachments(tableName, ProcurarAprovacaoPorAbaAnaliseId($(inovdfResp).closest('div.tab-pane').attr('id')).ID, inovdfResp);
    });

    var meioAmbiente = document.getElementById('txtAtt-tab-analise-meio-ambiente');

    meioAmbiente.addEventListener('change', function () {
        AddAttachments(tableName, ProcurarAprovacaoPorAbaAnaliseId($(meioAmbiente).closest('div.tab-pane').attr('id')).ID, meioAmbiente);
    });
}

function bloquearBotoesAbaAnexo(){

    var qualidResp = document.getElementById('txtAtt-tab-analise-qualidade');
    var qualidGer = document.getElementById('txtAtt-tab-analise-qualidade-ger');
    var envaseR = document.getElementById('txtAtt-tab-analise-envase');
    var fabricacao = document.getElementById('txtAtt-tab-analise-fabricacao');
    var fabrica = document.getElementById('txtAtt-tab-analise-fabrica');
    var inovde = document.getElementById('txtAtt-tab-analise-inovDe');
    var inovdfResp = document.getElementById('txtAtt-tab-analise-inovDf');
    var meioAmbiente = document.getElementById('txtAtt-tab-analise-meio-ambiente');
    qualidResp.disabled = true;
    qualidGer.disabled = true;
    envaseR.disabled = true;
    fabricacao.disabled = true;
    fabrica.disabled = true;
    inovde.disabled = true;
    inovdfResp.disabled = true;
    meioAmbiente.disabled = true;
}

function CarregarPaineisDeAnexos() {
    var tabAnexoVisible = ProcurarAprovacaoPorAbaAnaliseId($('#txtAtt-tab-analise-qualidade').closest('div.tab-pane').attr('id'));

    if (tabAnexoVisible != null) {
        var table = $("#data-table-anexo-qualidade");
        table.empty();
        getListItemAttachments("Agendamentos - Responsáveis", tabAnexoVisible.ID, table);
    }

    var tabAnexoEnvase = ProcurarAprovacaoPorAbaAnaliseId($('#txtAtt-tab-analise-envase').closest('div.tab-pane').attr('id'));

    if (tabAnexoEnvase != null) {
        var table = $("#data-table-anexo-envase");
        table.empty();
        getListItemAttachments("Agendamentos - Responsáveis", tabAnexoEnvase.ID, table);
    }

    var tabAnexoGerente = ProcurarAprovacaoPorAbaAnaliseId($('#txtAtt-tab-analise-qualidade-ger').closest('div.tab-pane').attr('id'));

    if (tabAnexoGerente != null) {
        var table = $("#data-table-anexo-qualid-ger");
        table.empty();
        getListItemAttachments("Agendamentos - Responsáveis", tabAnexoGerente.ID, table);
    }

    var tabAnexoFabricacao = ProcurarAprovacaoPorAbaAnaliseId($('#txtAtt-tab-analise-fabricacao').closest('div.tab-pane').attr('id'));

    if (tabAnexoFabricacao != null) {
        var table = $("#data-table-anexo-fabricacao");
        table.empty();
        getListItemAttachments("Agendamentos - Responsáveis", tabAnexoFabricacao.ID, table );
    }

    var tabAnexoFabrica = ProcurarAprovacaoPorAbaAnaliseId($('#txtAtt-tab-analise-fabrica').closest('div.tab-pane').attr('id'));

    if (tabAnexoFabrica != null) {
        var table = $("#data-table-anexo-fabrica");
        table.empty();
        getListItemAttachments("Agendamentos - Responsáveis", tabAnexoFabrica.ID, table);
    }

    var tabAnexoInovDe = ProcurarAprovacaoPorAbaAnaliseId($('#txtAtt-tab-analise-inovDe').closest('div.tab-pane').attr('id'));

    if (tabAnexoInovDe != null) {
        var table = $("#data-table-anexo-inovDe");
        table.empty();
        getListItemAttachments("Agendamentos - Responsáveis", tabAnexoInovDe.ID, table);
    }

    var tabAnexoInovDfResp = ProcurarAprovacaoPorAbaAnaliseId($('#txtAtt-tab-analise-inovDf').closest('div.tab-pane').attr('id'));
    if (tabAnexoInovDfResp != null) {
        var table = $("#data-table-anexo-inov-df-resp");
        table.empty();
        getListItemAttachments("Agendamentos - Responsáveis", tabAnexoInovDfResp.ID, table);
    }

    var tabAnexoMeioAmbiente = ProcurarAprovacaoPorAbaAnaliseId($('#txtAtt-tab-analise-meio-ambiente').closest('div.tab-pane').attr('id'));

    if (tabAnexoMeioAmbiente != null) {
        var table = $("#data-table-anexo-meio-ambiente");
        table.empty();
        getListItemAttachments("Agendamentos - Responsáveis", tabAnexoMeioAmbiente.ID, table );
    }
}

function getListItemAttachments(listTitle, itemId, tableAnexo) {
    var $promise = $.Deferred();
    var ctx = SP.ClientContext.get_current();
    var list = ctx.get_web().get_lists().getByTitle(listTitle);
    var item = list.getItemById(itemId);
    ctx.load(item);

    ctx.executeQueryAsync(function () {
        var hasAttachments = item.get_fieldValues()['Attachments'];

        if (hasAttachments) {
            getAttachmentFiles(item).then(function (attachments) {
                tableAnexo.show();
                tableAnexo.empty();
                var contador = 1;
                tableAnexo.append('<thead class="thead-dark"><tr><th scope="col" width="10%">#</th> <th scope="col" >Anexos</th></tr></thead>');
                tableAnexo.append('<tbody>');
                var table = '<tbody>';
                attachments.forEach(function (attachment) {
                    table = table + '<tr>';
                    table = table + '<th scope="row" width="10%">'+contador+'</th> <td ><a href="https://naturabr.sharepoint.com/sites/DEV_LotePiloto/Lists/AgendamentosResponsaveis/Attachments/'+itemId+'/'+attachment['name']+'?web=1'+'" target="_blank">'+attachment['name']+'</a></td>';
                    table = table + '</tr>';
                    contador = contador +1;
                });
                table.concat('</tbody>');
                tableAnexo.append(table);
                // $promise.resolve(attachments);
            }).fail($promise.reject);
        } else {
            $promise.resolve([]);
        }
    }, $promise.reject);

    return $promise;
}

function getAttachmentFiles(listItem) {
    var $promise = $.Deferred();
    var ctx = listItem.get_context();
    var attachmentFolderUrl = String.format('{0}/Attachments/{1}', listItem.get_fieldValues()['FileDirRef'], listItem.get_fieldValues()['ID']);
    var folder = ctx.get_web().getFolderByServerRelativeUrl(attachmentFolderUrl);
    var files = folder.get_files();
    ctx.load(files);

    ctx.executeQueryAsync(function () {
        var attachments = [];
        var file;

        for (var i = 0; file = files.get_item(i) ; i++) {
            attachments.push({
                url: file.get_serverRelativeUrl(),
                name: file.get_name()
            });
        }

        $promise.resolve(attachments);
    }, $promise.reject);

    return $promise;
}


$(document).ready(function () {
    $('#onetIDListForm').css('width', '100%');

    $.when(
        CarregarCategoriaProjeto(),
        CarregarFabricas(),
        CarregarLinhasDoProduto(),
        CarregarListaGrauComplexidade(),
        CarregarListaMotivos(),
        CarregarListaStatus(),
        CarregarListaTiposLotes(),
        CarregarMotivoCancelamento(),
        CarregarMotivoNaoExecutado(),
        InitializeAllPeoplePickers(),
        CarregarListaMotivoAnalise(),
        CarregarListasDeMeioAmbiente()
    ).then(function () {
        InstanciarDateTimePicker();
        RegistrarBindings();
        ResetarAgendamento();
        RegistrarBotoes();

        var id = getUrlParameter('loteid') == '' ? getUrlParameter('ID') : getUrlParameter('loteid');

        if (id == '') {
            ModificarFormState(EM_CRIACAO);
        } else {
            CarregarAgendamento(id);
        }

        setTimeout(function () {
            carregarBotoesAnexo();
            CarregarPaineisDeAnexos();
            bloquearBotoesAbaAnexo();
        }, 3000);
    });
});
