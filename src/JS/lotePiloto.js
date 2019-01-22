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
    if ($("input[type=checkbox]#acRespEngfabricacaoAcomp").prop('checked')) {
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
    if ($("input[type=checkbox]#acRespEngfabricacaoAcomp").prop('checked')) {
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
    }
}

function LimparValidacoes() {
}

//Função para adicionar anexos (Utilizado na aba de Análises)
function AddAttachments(listName, itemId, controlName) {
    var digest = "";
    $.ajax({
        url: "/_api/contextinfo",
        method: "POST",
        headers: {
            "ACCEPT": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function (data) {
            digest = data.d.GetContextWebInformation.FormDigestValue;
        },
        error: function (data) {
        }
    }).done(function () {
        var fileInput = $(controlName);
        var fileName = fileInput[0].files[0].name;
        var reader = new FileReader();
        reader.onload = function (e) {
            var fileData = e.target.result;
            var res11 = $.ajax({
                url: "/_api/web/lists/getbytitle('" + listName + "')/items(" + itemId + ")/AttachmentFiles/ add(FileName='" + fileName + "')",
                method: "POST",
                binaryStringRequestBody: true,
                data: fileData,
                processData: false,
                headers: {
                    "ACCEPT": "application/json;odata=verbose",
                    "X-RequestDigest": digest,
                    "content-length": fileData.byteLength
                },
                success: function (data) {
                },
                error: function (data) {
                }
            });
        };
        reader.readAsArrayBuffer(fileInput[0].files[0]);
    });
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
        let responsaveis = GetResponsaveisPorTipoDeLote($TipoLote.val());
        let promises = [];

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
            if (aprovacao[index] != null) {
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
            ModificarFormState($('select#status').val());

            CarregarAgendamentoResponsaveis(atributos.ows_CodigoAgendamento.value).then(function () {
                TerraSamba();
                $promise.resolve();
            }).fail(function (response) {
                $promise.reject(response);
            });
        }
    });

    return $promise;
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
                var responsavel = GetResponsavelPorNome(this.attributes.ows_TipoResponsavel.value);

                aprovacoes[responsavel.nome] = {
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
                };

                var usuarioNome = FiltrarNomeUsuarioPorPessoaId(this.attributes.ows_Pessoa.value);

                promessas.push(CarregarUsuarioPorLoginName(usuarioNome).then(function (usuario) {
                    PreencherPeoplePicker(responsavel.peoplePickerId, usuario);
                }));

                promessas.push(PreencherAbaAnalises(responsavel));
            });

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
        var $tab = $('#' + responsavel.abaAnaliseId);
        aprovacoes[responsavel.nome].ExecucaoLoteAcompanhada = $tab.find('[name=ExecucaoLoteAcompanhada]').prop('checked') ? '1' : '0';
        aprovacoes[responsavel.nome].Resultado = $tab.find('[name=Resultado]').val();
        aprovacoes[responsavel.nome].Observacoes = $tab.find('[name=ObservacoesAnalise]').val();
        aprovacoes[responsavel.nome].ReprovadoMotivo = $tab.find('[name=ReprovadoMotivo]').val();
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

    $abaAnalise.find('[name="ExecucaoLoteAcompanhada"]').prop('checked', aprovacao.ExecucaoLoteAcompanhada == "1");
    $abaAnalise.find('[name="Pessoa"]').val(FiltrarNomeUsuarioPorPessoaId(aprovacao.Pessoa));
    $abaAnalise.find('[name="Resultado"]').val(aprovacao.Resultado);
    $abaAnalise.find('[name="ObservacoesAnalise"]').val(aprovacao.Observacoes);
    if (aprovacao.ReprovadoMotivo != null) $abaAnalise.find('[name="ReprovadoMotivo"]').val(aprovacao.ReprovadoMotivo);

    $abaAnalise.find('[name=Pessoa]').attr('disabled', true);
    $abaAnalise.find('[name=ExecucaoLoteAcompanhada]').attr('disabled', true);
    $abaAnalise.find('[name=Resultado]').attr('disabled', true);
    $abaAnalise.find('[name=ObservacoesAnalise]').attr('disabled', true);
    $abaAnalise.find('[name=ReprovadoMotivo]').attr('disabled', true);
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

function CarregarHistorico(agendamentoId) {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetListItems',
        listName: 'Agendamentos - Histórico',
        CAMLQuery: '<Query><Where><Eq><FieldRef Name="CodigoAgendamento" /><Value Type="Text">' + agendamentoId + '</Value></Eq></Where></Query>',
        CAMLViewFields: '<ViewFields><FieldRef Name="Title" /><FieldRef Name="Area" /><FieldRef Name="Mensagem" /><FieldRef Name="CodigoAgendamento" /><FieldRef Name="Modified" /><FieldRef Name="Created" /><FieldRef Name="Author" /><FieldRef Name="Editor" /></ViewFields>',
        completefunc: function (Data, Status) {
            if (Status != 'success') {
                $promise.reject({
                    errorCode: '0x99999999',
                    errorText: 'Erro Remoto'
                });

                return;
            }

            var registros = [];

            $(Data.responseText).find("z\\:row").each(function () {
                var colunas = this.attributes;
                var registro = {};

                $.each(colunas, function () {
                    registro[this.name.substr(4)] = this.value;
                });

                registros.push(registro);
            });

            $promise.resolve(registros);
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
                $labelQuantidadePecas.text("Quantidade (peças) de " + AtributoNumber($(this).attr("ows_CapacidadeMin")) + " até " + AtributoNumber($(this).attr("ows_CapacidadeMax")))
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
    if ($('select[name=GrauComplexidade] :selected').val() == 2) {
        return CarregarListaResultadoAnaliseComSimilaridade();
    } else {
        return CarregarListaResultadoAnaliseSemSimilaridade();
    }
}

function CarregarListaResultadoAnaliseComSimilaridade() {
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

            var $resultado = $('select[name=Resultado]');

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

function CarregarListaResultadoAnaliseSemSimilaridade() {
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

            var $resultado = $('select[name=Resultado]');
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
            let responsaveis = GetResponsaveisPorTipoDeLote($TipoLote.val());
            let promises = [];

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
    {tipoDeLote: 'Brinde',     peoplePickerId: 'peoplePickerAbaRespRespDLPCL',         nome: 'DL/PCL - Responsável',           abaAnaliseId: null},
    {tipoDeLote: 'Brinde',     peoplePickerId: 'peoplePickerAbaRespRespQualidade',     nome: 'Qualidade - Responsável',        abaAnaliseId: 'tab-qualidade-resp'},
    {tipoDeLote: 'Brinde',     peoplePickerId: 'peoplePickerAbaRespGerQualidade',      nome: 'Qualidade - Gerente',            abaAnaliseId: 'tab-analise-qualidade-ger'},
    {tipoDeLote: 'Envase',     peoplePickerId: 'peoplePickerAbaRespRespDLPCL',         nome: 'DL/PCL - Responsável',           abaAnaliseId: null},
    {tipoDeLote: 'Envase',     peoplePickerId: 'peoplePickerAbaRespRespEngEnvase',     nome: 'Eng. Envase - Responsável',      abaAnaliseId: 'tab-eng-envase-resp'},
    {tipoDeLote: 'Envase',     peoplePickerId: 'peoplePickerAbaRespGerEngEnvase',      nome: 'Eng. Envase - Gerente',          abaAnaliseId: null},
    {tipoDeLote: 'Envase',     peoplePickerId: 'peoplePickerAbaRespRespInovDE',        nome: 'Inovação DE - Responsável',      abaAnaliseId: 'tab-inov-de-resp'},
    {tipoDeLote: 'Envase',     peoplePickerId: 'peoplePickerAbaRespGerInovDE',         nome: 'Inovação DE - Gerente',          abaAnaliseId: null},
    {tipoDeLote: 'Envase',     peoplePickerId: 'peoplePickerAbaRespRespQualidade',     nome: 'Qualidade - Responsável',        abaAnaliseId: 'tab-qualidade-resp'},
    {tipoDeLote: 'Envase',     peoplePickerId: 'peoplePickerAbaRespGerQualidade',      nome: 'Qualidade - Gerente',            abaAnaliseId: 'tab-analise-qualidade-ger'},
    {tipoDeLote: 'Envase',     peoplePickerId: 'peoplePickerAbaRespCoordProgFabrica',  nome: 'Fábrica - Coord. Programação',   abaAnaliseId: null},
    {tipoDeLote: 'Envase',     peoplePickerId: 'peoplePickerAbaRespCoordManFabrica',   nome: 'Fábrica - Coord. de Manufatura', abaAnaliseId: 'tab-fabrica-resp'},
    {tipoDeLote: 'Envase',     peoplePickerId: 'peoplePickerAbaRespGerFabrica',        nome: 'Fábrica - Gerente',              abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', peoplePickerId: 'peoplePickerAbaRespRespDLPCL',         nome: 'DL/PCL - Responsável',           abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', peoplePickerId: 'peoplePickerAbaRespRespEngFabricacao', nome: 'Eng. Fabricação - Responsável',  abaAnaliseId: 'tab-eng-fabricacao-resp'},
    {tipoDeLote: 'Fabricação', peoplePickerId: 'peoplePickerAbaRespGerEngFabricacao',  nome: 'Eng. Fabricação - Gerente',      abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', peoplePickerId: 'peoplePickerAbaRespRespInovDF',        nome: 'Inovação DF - Responsável',      abaAnaliseId: 'tab-inov-df-resp'},
    {tipoDeLote: 'Fabricação', peoplePickerId: 'peoplePickerAbaRespGerInovDF',         nome: 'Inovação DF - Gerente',          abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', peoplePickerId: 'peoplePickerAbaRespRespQualidade',     nome: 'Qualidade - Responsável',        abaAnaliseId: 'tab-qualidade-resp'},
    {tipoDeLote: 'Fabricação', peoplePickerId: 'peoplePickerAbaRespGerQualidade',      nome: 'Qualidade - Gerente',            abaAnaliseId: 'tab-analise-qualidade-ger'},
    {tipoDeLote: 'Fabricação', peoplePickerId: 'peoplePickerAbaRespCoordProgFabrica',  nome: 'Fábrica - Coord. Programação',   abaAnaliseId: null},
    {tipoDeLote: 'Fabricação', peoplePickerId: 'peoplePickerAbaRespCoordManFabrica',   nome: 'Fábrica - Coord. de Manufatura', abaAnaliseId: 'tab-fabrica-resp'},
    {tipoDeLote: 'Fabricação', peoplePickerId: 'peoplePickerAbaRespGerFabrica',        nome: 'Fábrica - Gerente',              abaAnaliseId: null},
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

            if (VerificarGrupoRespOuAcomp()) {
                if (!$btnEditar.is(':visible')) {
                    $btnEditarRespOuAcomp.show();
                }
                $btnNaoExecutado.show();
                $btnExecutado.show();
            }
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
    var $engFabResponsavelPPGer = $('#peoplePickerAbaRespRespGerFabricacao_TopSpan_EditorInput');
    var $inovDfResponsavelAcompanhamento = $('[name=InovacaoDfAcompanhamento]');
    var $inovDfResponsavelPPResp = $('#peoplePickerAbaRespRespInovDF_TopSpan_EditorInput');
    var $inovDfResponsavelPPGer = $('#peoplePickerAbaRespGerInovDF_TopSpan_EditorInput');
    var $inovDeResponsavelAcompanhamento = $('[name=InovacaoDeAcompanhamento]');
    var $inovDeResponsavelPPResp = $('#peoplePickerAbaRespRespInovDE_TopSpan_EditorInput');
    var $inovDeResponsavelPPGer = $('#peoplePickerAbaRespGerInovDE_TopSpan_EditorInput');
    var $fabricaResponsavelAcompanhamento = $('[name=FabricaAcompanhamento]');
    var $fabricaResponsavelPPCoordProg = $('#peoplePickerAbaRespCoordProgFabrica_TopSpan_EditorInput');
    var $fabricaResponsavelPPCoordMan = $('#peoplePickerAbaRespCoordManFabrica_TopSpan_EditorInput');
    var $fabricaResponsavelPPGer = $('#peoplePickerAbaRespGerInovDE_TopSpan_EditorInput');
    var $qualidadeResponsavelAcompanhamento = $('[name=QualidadeAcompanhamento]');
    var $qualidadeResponsavelPPResp = $('#peoplePickerAbaRespRespQualidade_TopSpan_EditorInput');
    var $qualidadeResponsavelPPGer = $('#peoplePickerAbaRespGerQualidade_TopSpan_EditorInput');
    var $meioAmbienteResponsavelAcompanhamento = $('[name=MeioAmbienteAcompanhamento]');
    var $meioAmbienteResponsavelPPResp = $('#peoplePickerAbaAcRespMeioAmbiente_TopSpan_EditorInput');

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
    $engFabResponsavelPPGer.attr('disabled', true);
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

    $('#pills-analise-qualidade-ger').addClass('disabled');

    Object.keys(aprovacoes).forEach(function (index) {
        var responsavel = GetResponsavelPorNome(index);

        if (responsavel.abaAnaliseId != null) {
            var $abaAnalise = $('#' + responsavel.abaAnaliseId);
            $abaAnalise.find('[name=Pessoa]').attr('disabled', true);
            $abaAnalise.find('[name=ExecucaoLoteAcompanhada]').attr('disabled', true);
            $abaAnalise.find('[name=Resultado]').attr('disabled', true);
            $abaAnalise.find('[name=ObservacoesAnalise]').attr('disabled', true);
            $abaAnalise.find('[name=ReprovadoMotivo]').attr('disabled', true);
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
            $engFabResponsavelPPGer.attr('disabled', false);
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
                    }
                    if (usuarioPertenceAoGrupo($xml, engFabricacao)) {
                        $engFabResponsavelAcompanhamento.attr('disabled', false);
                        $engFabResponsavelPPResp.attr('disabled', false);
                        $engFabResponsavelPPGer.attr('disabled', false);
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
            var mostrarAbaQualidadeGerente = true;
            Object.keys(aprovacoes).forEach(function (index) {
                var responsavel = GetResponsavelPorNome(index);
                var aprovacao = aprovacoes[index];

                if (responsavel.abaAnaliseId != null &&
                        CarregarUsuarioAtual().id == FiltrarIdPorPessoaId(aprovacao.Pessoa) &&
                        ['Pendente', 'Rascunho'].indexOf(aprovacao.Resultado) != -1) {
                    var $abaAnalise = $('#' + responsavel.abaAnaliseId);
                    $abaAnalise.find('[name=ExecucaoLoteAcompanhada]').attr('disabled', false);
                    $abaAnalise.find('[name=Resultado]').attr('disabled', false);
                    $abaAnalise.find('[name=ObservacoesAnalise]').attr('disabled', false);
                    if (mostrarAbaQualidadeGerente && !$abaAnalise.find('[name=Resultado] :selected').val().startsWith('Aprovado')) {
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
    $('#pills-analise-qualidade-ger').hide();

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
            $("#pills-eng-fabricacao-acomp-tab").show();
            $("#pills-inov-df-acomp-tab").show();
            $("#pills-inov-de-acomp-tab").show();
            $("#pills-qualidade-acomp-tab").hide();
            $("#pills-fabrica-acomp-tab").show();
            $("#pills-meioambiente-acomp-tab").show();

            $('input[type=checkbox]#acRespEngEnvaseAcomp').prop('checked', false);
            $('input[type=checkbox]#acRespEngfabricacaoAcomp').prop('checked', false);
            $('input[type=checkbox]#acRespInovDFAcomp').prop('checked', false);
            $('input[type=checkbox]#acRespInovDEAcomp').prop('checked', false);
            $('input[type=checkbox]#acRespFabricaAcomp').prop('checked', false);
            $('input[type=checkbox]#acRespMeioAmbienteAcomp').prop('checked', false);

            $('#AbaAcRespsEngEnvase').hide();
            $('#AbaAcRespsEngFabricacao').hide();
            $('#AbaAcRespsInovDF').hide();
            $('#AbaAcRespsInovDE').hide();
            $('#AbaAcRespsFabrica').hide();
            $('#AbaAcRespsMeioAmbiente').hide();

            $('#pills-tab-qualidade-resp').show();
            $('#pills-tab-qualidade-resp').tab('show');
            $('#pills-analise-qualidade-ger').show();
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
            $("#pills-inov-df-acomp-tab").hide();
            $("#pills-inov-de-acomp-tab").hide();
            $("#pills-qualidade-acomp-tab").hide();
            $("#pills-fabrica-acomp-tab").hide();
            $("#pills-meioambiente-acomp-tab").show();

            $('input[type=checkbox]#acRespEngEnvaseAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespEngfabricacaoAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespInovDFAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespInovDEAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespFabricaAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespMeioAmbienteAcomp').prop('checked',false);

            $('#AbaAcRespsEngEnvase').hide();
            $('#AbaAcRespsEngFabricacao').hide();
            $('#AbaAcRespsInovDF').hide();
            $('#AbaAcRespsInovDE').hide();
            $('#AbaAcRespsFabrica').hide();
            $('#AbaAcRespsMeioAmbiente').hide();

            $('#pills-tab-qualidade-resp').show();
            $("#pills-tab-qualidade-resp").tab('show');
            $('#pills-tab-eng-envase-resp').show();
            $('#pills-tab-inov-de-resp').show();
            $('#pills-tab-fabrica-resp').show();
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
            $("#pills-eng-fabricacao-acomp-tab").hide();
            $("#pills-inov-df-acomp-tab").hide();
            $("#pills-inov-de-acomp-tab").show();
            $("#pills-qualidade-acomp-tab").hide();
            $("#pills-fabrica-acomp-tab").hide();
            $("#pills-meioambiente-acomp-tab").show();

            $('input[type=checkbox]#acRespEngEnvaseAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespEngfabricacaoAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespInovDFAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespInovDEAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespFabricaAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespMeioAmbienteAcomp').prop('checked',false);

            $('#AbaAcRespsEngEnvase').hide();
            $('#AbaAcRespsEngFabricacao').hide();
            $('#AbaAcRespsInovDF').hide();
            $('#AbaAcRespsInovDE').hide();
            $('#AbaAcRespsFabrica').hide();
            $('#AbaAcRespsMeioAmbiente').hide();

            $('#pills-tab-eng-fabricacao-resp').show();
            $('#pills-tab-eng-fabricacao-resp').tab('show');
            $('#pills-tab-inov-df-resp').show();
            $('#pills-tab-fabrica-resp').show();
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

            $('input[type=checkbox]#acRespEngEnvaseAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespEngfabricacaoAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespInovDFAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespInovDEAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespFabricaAcomp').prop('checked',false);
            $('input[type=checkbox]#acRespMeioAmbienteAcomp').prop('checked',false);

            $('#AbaAcRespsEngEnvase').hide();
            $('#AbaAcRespsEngFabricacao').hide();
            $('#AbaAcRespsInovDF').hide();
            $('#AbaAcRespsInovDE').hide();
            $('#AbaAcRespsFabrica').hide();
            $('#AbaAcRespsMeioAmbiente').hide();

            $('#pills-tab-qualidade-resp').hide();
            $('#pills-tab-eng-envase-resp').hide();
            $('#pills-tab-eng-fabricacao-resp').hide();
            $('#pills-tab-inov-df-resp').hide();
            $('#pills-tab-inov-de-resp').hide();
            $('#pills-tab-fabrica-resp').hide();
            $('#pills-tab-analise-qualidade-ger').hide();

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
    var $acRespEngfabricacaoAcomp = $("input[type=checkbox]#acRespEngfabricacaoAcomp");
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

    $acRespEngfabricacaoAcomp.change(function () {
        if ($acRespEngfabricacaoAcomp.prop('checked')) {
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
            if ($tipoLote.val() != 'Brinde') {
                $("#pills-tab-meio-ambiente-resp").removeClass('d-md-none');
            }
        }
        else {
            if ($tipoLote.val() != 'Brinde') {
                $("#pills-tab-meio-ambiente-resp").addClass('d-md-none');
            }
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
    espelharCheckBox('#acRespEngfabricacao', '#acRespEngfabricacaoAcomp');
    espelharCheckBox('#acRespInofDF', '#acRespInofDFAcomp');
    espelharCheckBox('#acRespInofDE', '#acRespInofDEAcomp');
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
    $(checkA).change(function () {
        $(checkB).prop('checked', this.checked);
    });

    $(checkB).change(function () {
        $(checkA).prop('checked', this.checked);
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
    window.history.pushState("object", "", "main.aspx?action=new");
}

function ValidarQtdPecas() {
    var quantidadePecas = document.getElementById('produtoQuantidade').value;

}

function RegistrarBotoes() {
    var $btnSalvar = $('.btn-salvar');
    $btnSalvar.click(function () {
        SalvarAgendamento().then(function () {
            var id = $('input[name="ID"]').val();
            window.history.pushState('Object', '', '/sites/DEV_LotePiloto/SiteAssets/main.aspx?action=edit&loteid=' + id);
            alert("Agendamento Salvo");
        }).fail(function (response) {
            alert('Ops., algo deu errado. Mensagem: ' + response.errorText);
        });

        return false;
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
        produtoEnvioAmostras,
        produtoResponsavelAmostra,
        produtoQuantidadeAmostra,
        agendamentoCentroCusto,
        grauComplexidade,
        agendamentoDataInicioProgramado,
        agendamentoDuracaoHoras,
        agendamentoDuracaoMinutos,
        agendamentoFim,
        agendamentoObservacoes,
    };

    var erro = 0;

    var itens;
    for (itens in $campos) {
        var $atributo =  $('#'+itens);
        var $classe = $atributo.attr('class');

        if($classe.indexOf('tom-selec') > 0){
            if( $atributo.children('option:selected').val()  === 'Selecione uma opção') {
                var $tabItem = $atributo.parents('div.tab-pane');
                var tabId = $tabItem.attr('id');
                var $tabContent = $tabItem.parents('div.tab-content');
                var $link = $tabContent.parent().find('ul.nav.nav-tabs li a[href="#' + tabId + '"]');
                $link.tab('show');
                $atributo.first().focus();
                erro = 1;
                break;
            }
        } else {
            if ($atributo.val().length == 0 ){
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
    }

    var $camposPeople = {
        peoplePickerAbaRespGerQualidade_TopSpan,
        peoplePickerAbaRespRespQualidade_TopSpan
    };

    var people;

    if (erro == 0) {
        for ( people in $camposPeople) {
            var $atributo =  $('#'+people);

            if (!SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespQualidade_TopSpan.HasResolvedUsers()) {
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
            } else if (SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespQualidade_TopSpan.HasInputError) {
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

function scrollToElement(ele) {
    $(window).scrollTop(ele.offset().top);
}

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

function TerraSamba() {
    var ID_AGENDAMENTOS = $('#inputId').val();
    var ID_AGENGAMENTOS_CODIGO_PRODUTO = $('#CodigoProduto').val();
    var ID_AGENGAMENTO_RESPONSAVEL = 0;
    var AGENDAMENTOS_LIST = "Agendamentos";
    var AGENDAMENTOS_RESPONSAVEIS_LIST = "Agendamentos - Responsáveis";

    var AGENDAMENTOS_HISTORY_REST_QUERY = "/_api/web/lists/GetByTitle('" + AGENDAMENTOS_LIST + "')/items(" + ID_AGENDAMENTOS + ")/Versions?$select=VersionLabel,Created,Title,CodigoProduto,LinhaProduto,DescricaoProduto,Projeto,CategoriaProjeto,Motivo,TipoLote,QuantidadePecas,Formula,EnvioAmostras,ResponsavelAmostra,QuantidadeAmostra,InicioProgramado,DuracaoEstimadaHoras,DuracaoEstimadaMinutos,FimProgramado,Fabrica,LinhaEquipamento,CentroCusto,GrauComplexidade,MaoObra,Observacoes,Status,EngenhariaFabricacaoAcompanhamen,EngenhariaEnvaseAcompanhamento,InovacaoDfAcompanhamento,InovacaoDeAcompanhamento,QualidadeAcompanhamento,FabricaAcompanhamento,CodigoAgendamento,NaoExecutadoMotivo,NaoExecutadoComentarios,CanceladoMotivo,CanceladoComentarios,ReagendamentoContador,CalendarioTitulo,CalendarioSubtitulo,Executado,MeioAmbienteAcompanhamento,RegistroAnalisesInicio,LinhaEquipamento,Editor&$expand=Linha_x005f_x0020_x005f_ou_x005f_x0020_x005f_Equipamento/ID&$orderby=VersionLabel asc";
    var AGENDAMENTOS_RESPONSAVEIS_REST_QUERY = "/_api/web/lists/GetByTitle('" + AGENDAMENTOS_RESPONSAVEIS_LIST + "')/items/?$select=Id&$filter=CodigoAgendamento eq " + ID_AGENGAMENTOS_CODIGO_PRODUTO;
    var AGENDAMENTO_RESPONSAVEL_VERSION_REST_QUERY = "/_api/web/lists/GetByTitle('" + AGENDAMENTOS_RESPONSAVEIS_LIST + "')/items(" + ID_AGENGAMENTO_RESPONSAVEL + ")/Versions?$select=VersionLabel,Title,CodigoAgendamento,TipoResponsavel,Pessoa,Resultado,ExecucaoLoteAcompanhada,Avaliado,Avaliador,Observacoes,MeioAmbienteAbastecimentoVacuo,MeioAmbienteAbastecimentoGranel,MeioAmbienteAbastecimentoManual,MeioAmbienteAcondicionamentoMate,MeioAmbienteAcondicionamentoReci,MeioAmbienteAumentoGeracaoResidu,MeioAmbienteTipoResiduosGeradosJ,MeioAmbienteAumentoConsumoAguaLi,MeioAmbienteAumentoConsumoEnergi,MeioAmbienteAumentoConsumoAguaFa,SimilarCodigoAgendamento,ReprovadoMotivo,ID,Modified,Editor";

    var agendamentos = [];
    var agendamentosResponsaveisIds = [];
    var agendamentosResponsaveis = [];
    var agendamentosProcessados = [];

    $('#data-table')
        .empty()
        .append('<td width="20%">Versão</td>')
        .append('<td width="40%">Campo</td>')
        .append('<td width="40%">Valor</td>');

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

    var openAGENDAMENTOS_Call = $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + AGENDAMENTOS_HISTORY_REST_QUERY,
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose"
        }
    });

    var openAGENDAMENTOS_RESPONSAVEIS_IDS_Call = $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + AGENDAMENTOS_RESPONSAVEIS_REST_QUERY,
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose"
        }
    });

    var openAGENDAMENTO_RESPONSAVEL_VERSIONS_Call = $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + AGENDAMENTO_RESPONSAVEL_VERSION_REST_QUERY,
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose"
        }
    });

    var index;
    var indexVersions;
    var indexResp;

    openAGENDAMENTOS_RESPONSAVEIS_IDS_Call.done(function (data, textStatus, jqXHR) {
        for (index in data.d.results) {
            agendamentosResponsaveisIds.push(data.d.results[index].Id);
        }
        for (indexVersions in agendamentosResponsaveisIds) {
            ID_AGENGAMENTO_RESPONSAVEL = agendamentosResponsaveisIds[indexVersions];

            openAGENDAMENTO_RESPONSAVEL_VERSIONS_Call.done(function (dataVersion, textStatusVersion, jqXHRVersion) {
                for (indexResp in dataVersion.d.results) {
                    var responsavel = new AgendamentoResponsavel();
                    responsavel.add(new Propriedade('VersionLabel', 'string', (typeof dataVersion.d.results[indexResp].VersionLabel === "undefined") ? '' : dataVersion.d.results[indexResp].VersionLabel));
                    responsavel.add(new Propriedade('Title', 'string', (typeof dataVersion.d.results[indexResp].Title === "undefined") ? '' : dataVersion.d.results[indexResp].Title));
                    responsavel.add(new Propriedade('CodigoAgendamento', 'string', (typeof dataVersion.d.results[indexResp].CodigoAgendamento === "undefined") ? '' : dataVersion.d.results[indexResp].CodigoAgendamento));
                    responsavel.add(new Propriedade('TipoResponsavel', 'string', (typeof dataVersion.d.results[indexResp].TipoResponsavel === "undefined") ? '' : dataVersion.d.results[indexResp].TipoResponsavel));
                    responsavel.add(new Propriedade('Pessoa', 'string', (typeof dataVersion.d.results[indexResp].Pessoa === "undefined") ? '' : dataVersion.d.results[indexResp].Pessoa));
                    responsavel.add(new Propriedade('Resultado', 'string', (typeof dataVersion.d.results[indexResp].Resultado === "undefined") ? '' : dataVersion.d.results[indexResp].Resultado));
                    responsavel.add(new Propriedade('ExecucaoLoteAcompanhada', 'string', (typeof dataVersion.d.results[indexResp].ExecucaoLoteAcompanhada === "undefined") ? '' : dataVersion.d.results[indexResp].ExecucaoLoteAcompanhada));
                    responsavel.add(new Propriedade('Avaliado', 'string', (typeof dataVersion.d.results[indexResp].Avaliado === "undefined") ? '' : dataVersion.d.results[indexResp].Avaliado));
                    responsavel.add(new Propriedade('Avaliador', 'string', (typeof dataVersion.d.results[indexResp].Avaliador === "undefined") ? '' : dataVersion.d.results[indexResp].Avaliador));
                    responsavel.add(new Propriedade('Observacoes', 'string', (typeof dataVersion.d.results[indexResp].Observacoes === "undefined") ? '' : dataVersion.d.results[indexResp].Observacoes));
                    responsavel.add(new Propriedade('MeioAmbienteAbastecimentoVacuo', 'string', (typeof dataVersion.d.results[indexResp].MeioAmbienteAbastecimentoVacuo === "undefined") ? '' : dataVersion.d.results[indexResp].MeioAmbienteAbastecimentoVacuo));
                    responsavel.add(new Propriedade('MeioAmbienteAbastecimentoGranel', 'string', (typeof dataVersion.d.results[indexResp].MeioAmbienteAbastecimentoGranel === "undefined") ? '' : dataVersion.d.results[indexResp].MeioAmbienteAbastecimentoGranel));
                    responsavel.add(new Propriedade('MeioAmbienteAbastecimentoManual', 'string', (typeof dataVersion.d.results[indexResp].MeioAmbienteAbastecimentoManual === "undefined") ? '' : dataVersion.d.results[indexResp].MeioAmbienteAbastecimentoManual));
                    responsavel.add(new Propriedade('MeioAmbienteAcondicionamentoMate', 'string', (typeof dataVersion.d.results[indexResp].MeioAmbienteAcondicionamentoMate === "undefined") ? '' : dataVersion.d.results[indexResp].MeioAmbienteAcondicionamentoMate));
                    responsavel.add(new Propriedade('MeioAmbienteAcondicionamentoReci', 'string', (typeof dataVersion.d.results[indexResp].MeioAmbienteAcondicionamentoReci === "undefined") ? '' : dataVersion.d.results[indexResp].MeioAmbienteAcondicionamentoReci));
                    responsavel.add(new Propriedade('MeioAmbienteAumentoGeracaoResidu', 'string', (typeof dataVersion.d.results[indexResp].MeioAmbienteAumentoGeracaoResidu === "undefined") ? '' : dataVersion.d.results[indexResp].MeioAmbienteAumentoGeracaoResidu));
                    responsavel.add(new Propriedade('MeioAmbienteTipoResiduosGeradosJ', 'string', (typeof dataVersion.d.results[indexResp].MeioAmbienteTipoResiduosGeradosJ === "undefined") ? '' : dataVersion.d.results[indexResp].MeioAmbienteTipoResiduosGeradosJ));
                    responsavel.add(new Propriedade('MeioAmbienteAumentoConsumoAguaLi', 'string', (typeof dataVersion.d.results[indexResp].MeioAmbienteAumentoConsumoAguaLi === "undefined") ? '' : dataVersion.d.results[indexResp].MeioAmbienteAumentoConsumoAguaLi));
                    responsavel.add(new Propriedade('MeioAmbienteAumentoConsumoEnergi', 'string', (typeof dataVersion.d.results[indexResp].MeioAmbienteAumentoConsumoEnergi === "undefined") ? '' : dataVersion.d.results[indexResp].MeioAmbienteAumentoConsumoEnergi));
                    responsavel.add(new Propriedade('MeioAmbienteAumentoConsumoAguaFa', 'string', (typeof dataVersion.d.results[indexResp].MeioAmbienteAumentoConsumoAguaFa === "undefined") ? '' : dataVersion.d.results[indexResp].MeioAmbienteAumentoConsumoAguaFa));
                    responsavel.add(new Propriedade('SimilarCodigoAgendamento', 'string', (typeof dataVersion.d.results[indexResp].SimilarCodigoAgendamento === "undefined") ? '' : dataVersion.d.results[indexResp].SimilarCodigoAgendamento));
                    responsavel.add(new Propriedade('ReprovadoMotivo', 'string', (typeof dataVersion.d.results[indexResp].ReprovadoMotivo === "undefined") ? '' : dataVersion.d.results[indexResp].ReprovadoMotivo));
                    responsavel.add(new Propriedade('ID', 'string', (typeof dataVersion.d.results[indexResp].ID === "undefined") ? '' : dataVersion.d.results[indexResp].ID));
                    responsavel.add(new Propriedade('Modified', 'string', (typeof moment.utc(dataVersion.d.results[indexResp].Modified).local() === "undefined") ? '' : moment.utc(dataVersion.d.results[indexResp].Modified).local()));
                    responsavel.add(new Propriedade('Editor', 'string', (typeof dataVersion.d.results[indexResp].Editor === "undefined") ? '' : dataVersion.d.results[indexResp].Editor));

                    agendamentos.push(responsavel);

                    if (indexResp > 0) {
                        agendamentosProcessados.push(ProcessaAgendamento(agendamentos[indexResp], agendamentos[indexResp - 1]));
                    }
                    else {
                        agendamentosProcessados.push(agendamento);
                    }
                }
            });
        }

        ProcessaHistorico(agendamentosProcessados);
    });

    openAGENDAMENTOS_Call.done(function (data, textStatus, jqXHR) {

        for (index in data.d.results) {
            var agendamento = new Agendamento();
            agendamento.add(new Propriedade('VersionLabel', 'string', (typeof data.d.results[index].VersionLabel === "undefined") ? '' : data.d.results[index].VersionLabel));
            agendamento.add(new Propriedade('Created', 'date', (typeof moment.utc(data.d.results[index].Created).local() === "undefined") ? '' : moment.utc(data.d.results[index].Created).local()));
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
                agendamentosProcessados.push(ProcessaAgendamento(agendamentos[index], agendamentos[index - 1]));
            }
            else {
                agendamentosProcessados.push(agendamento);
            }
        }
        ProcessaHistorico(agendamentosProcessados);
    });
}

$(document).ready(function () {
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
        CarregarListaResultadoAnalise(),
        CarregarListaMotivoAnalise()
    ).then(function () {
        InstanciarDateTimePicker();
        RegistrarBindings();
        ResetarAgendamento();
        RegistrarBotoes();

        if (getUrlParameter('action') == 'new') {
            ModificarFormState(EM_CRIACAO);
        } else if (getUrlParameter('action') == 'edit') {
            CarregarAgendamento(getUrlParameter('loteid'));
        }
    });
});
