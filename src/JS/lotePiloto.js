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
var EM_DERIVACAO = 'emDerivacao';

var state;

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
    else if (ValidarLinhaEquipamento() === false) {
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

    if ($('select#grauComplexidade').children('option:selected').val() === 'Selecione uma opção') {
        errorAgendamentosAgendamento++;
        NotificarErroValidacao('select', 'select#grauComplexidade', '', '');
    }
    else {
        LimparValidacao('select', 'select#grauComplexidade', '');
    }

    if ($('input#agendamentoDataInicioProgramado').val() === null || $('input#agendamentoDataInicioProgramado').val() == '') {
        errorAgendamentosAgendamento++;
        NotificarErroValidacao('text', 'input#agendamentoDataInicioProgramado', '', '');
    }
    else {
        var SelectedDate = new Date($('input#agendamentoDataInicioProgramado').val().substring(6, 10), $('input#agendamentoDataInicioProgramado').val().substring(3, 5) - 1, $('input#agendamentoDataInicioProgramado').val().substring(0, 2));
        var CurrentDateTime = new Date();
        var CurrentDate = new Date(CurrentDateTime.getFullYear(), CurrentDateTime.getMonth(), CurrentDateTime.getDate());

        if (CurrentDate > SelectedDate) {
            errorAgendamentosAgendamento++;
            NotificarErroValidacao('text', 'input#agendamentoDataInicioProgramado', '', '');
        }
        else {
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
    ModificarStatusPorFormState(formState);
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

    return $promise;
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

            CarregarSelects(selectsACarregar);
            ModificarFormState($('select#status').val());
            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarSelects(selectsACarregar) {
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
                $('select#grauComplexidade').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
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
                $('select#tipoDeLote').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
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
            let responsaveis = GetCamposResponsaveisPorTipoDeLote($TipoLote.val());
            let promises = [];

            $.each(responsaveis, function (i, responsavel) {
                promises.push(InserirResponsavelAgendamento(response.record.attr('ows_CodigoAgendamento'), responsavel));
            });

            return $.when.apply($, promises).then(function () {
                return response;
            });
        });
    });
}

function GetCamposResponsaveisPorTipoDeLote(tipoDeLote) {
    switch (tipoDeLote) {
        case 'Brinde':
            return [
                {campo: 'peoplePickerAbaRespRespDLPCL', nome: 'DL/PCL - Responsável'},
                {campo: 'peoplePickerAbaRespRespQualidade', nome: 'Qualidade - Responsável'},
                {campo: 'peoplePickerAbaRespGerQualidade', nome: 'Qualidade - Gerente'}
            ];
        case 'Envase':
            return [
                {campo: 'peoplePickerAbaRespRespDLPCL', nome: 'DL/PCL - Responsável'} ,
                {campo: 'peoplePickerAbaRespRespEngEnvase', nome: 'Eng. Envase - Responsável'} ,
                {campo: 'peoplePickerAbaRespGerEngEnvase', nome: 'Eng. Envase - Gerente'} ,
                {campo: 'peoplePickerAbaRespRespInovDE', nome: 'Inovação DE - Responsável'} ,
                {campo: 'peoplePickerAbaRespGerInovDE', nome: 'Inovação DE - Gerente'} ,
                {campo: 'peoplePickerAbaRespRespQualidade', nome: 'Qualidade - Responsável'} ,
                {campo: 'peoplePickerAbaRespGerQualidade', nome: 'Qualidade - Gerente'} ,
                {campo: 'peoplePickerAbaRespCoordProgFabrica', nome: 'Fábrica - Coord. Programação'} ,
                {campo: 'peoplePickerAbaRespCoordManFabrica', nome: 'Fábrica - Coord. de Manufatura'} ,
                {campo: 'peoplePickerAbaRespGerFabrica', nome: 'Fábrica - Gerente'}
            ];
        case 'Fabricação':
            return [
                {campo: 'peoplePickerAbaRespRespDLPCL', nome: 'DL/PCL - Responsável'},
                {campo: 'peoplePickerAbaRespRespEngFabricacao', nome: 'Eng. Fabricação - Responsável'},
                {campo: 'peoplePickerAbaRespGerEngFabricacao', nome: 'Eng. Fabricação - Gerente'},
                {campo: 'peoplePickerAbaAcRespInovDF', nome: 'Inovação DF - Responsável'},
                {campo: 'peoplePickerAbaAcGerInovDF', nome: 'Inovação DF - Gerente'},
                {campo: 'peoplePickerAbaRespRespQualidade', nome: 'Qualidade - Responsável'},
                {campo: 'peoplePickerAbaRespGerQualidade', nome: 'Qualidade - Gerente'},
                {campo: 'peoplePickerAbaRespCoordProgFabrica', nome: 'Fábrica - Coord. Programação'},
                {campo: 'peoplePickerAbaRespCoordManFabrica', nome: 'Fábrica - Coord. de Manufatura'},
                {campo: 'peoplePickerAbaRespGerFabrica', nome: 'Fábrica - Gerente'}
            ];
    }
}

function PegarUsuarioDoPeoplePicker(peoplePickerId) {
    var peoplePickerName = $('#' + peoplePickerId + ' .sp-peoplepicker-topLevel').attr('id');
    var peoplePickerUser = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerName].GetAllUserInfo().pop();

    if (peoplePickerUser == undefined) {
        return null;
    }

    return {
        loginName: peoplePickerUser.Key,
        nome: peoplePickerUser.DisplayText,
        email: peoplePickerUser.EntityData.Email
    };
}

function InserirResponsavelAgendamento(codigoAgendamento, responsavel) {
    var usuarioDoPeoplePicker = PegarUsuarioDoPeoplePicker(responsavel.campo);

    return CarregarUsuario(usuarioDoPeoplePicker.loginName).then(function (usuario) {
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
    });
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
]

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
    var $btnAprovar = $('.btn-aprovar');
    var $btnReprovarAprovar = $('.btn-reprovar');
    var $btnDerivar = $('.btn-derivar');
    var $btnCancelar = $('.btn-cancelar-agendamento');
    var $btnSalvar = $('.btn-salvar');
    var $btnNaoExecutado = $('.btn-nao-executado');
    var $btnEditar = $('.btn-editar');
    var $btnEditarRespOuAcomp = $('.btn-editar-resp-acomp');
    var $btnAbandonar = $('.btn-abandonar');

    $btnAgendar.hide();
    $btnExecutado.hide();
    $btnAprovar.hide();
    $btnReprovarAprovar.hide();
    $btnDerivar.hide();
    $btnCancelar.hide();
    $btnSalvar.hide();
    $btnNaoExecutado.hide();
    $btnEditar.hide();
    $btnEditarRespOuAcomp.hide();
    $btnAbandonar.hide();

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
            }
            break;
        case REGISTRO_DE_ANALISE:
            // $btnAprovar.show();
            // $btnReprovarAprovar.show();
            break;
        case EM_NAO_EXECUCAO:
            if (VerificarGrupoDlPclOuPlantaPiloto()) {
                $btnSalvar.show();
            }
            break;
        case 'Aguardando Reagendamento':
            if (VerificarGrupoDlPclOuPlantaPiloto()) $btnDerivar.show();
            break;
    }
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
        case EM_CANCELAMENTO:
            $('[name=CanceladoMotivo]').attr('disabled', false);
            $('[name=CanceladoComentarios]').attr('disabled', false);
            break;
        case EM_NAO_EXECUCAO:
            $('[name=NaoExecutadoMotivo]').attr('disabled', false);
            $('[name=NaoExecutadoComentarios]').attr('disabled', false);
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
    }
}

function ModificarFormState(formState) {
    state = formState;
    ModificarBotoesPorFormState(formState);
    ModificarCamposPorFormState(formState);
    ModificarAbasPorFormState(formState);
}

function ModificarAbasPorFormState(formState) {
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
    }
}

function ModificarAbasPorTipoDeLote(tipoDeLote) {
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

            break;
        case 'Picking':
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

function CarregarUsuario(loginName) {
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

function PreencherResponsavelDlPcl() {
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAbaRespRespDLPCL_TopSpan;

    if (peoplePicker.TotalUserCount == 0) {
        peoplePicker.AddUnresolvedUser(GerarISPClientPeoplePickerEntityPorUsuario(CarregarUsuarioAtual()), true);
    }
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
        }
        else {
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
    document.getElementById('inputId').value = "";
    document.getElementById('codigoProduto').value = "";
    document.getElementById('produtoDescricao').value = "";
    ModificarStatus('Rascunho');
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

    $('.btn-aprovar').click(function () {
        ModificarFormState(APROVADO);
        SalvarAgendamento();
    });

    $('.btn-reprovar').click(function () {
        ModificarFormState(REPROVADO);
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
        }
    });

    $('.btn-editar-resp-acomp').click(function () {
        ModificarFormState(RESP_ACOMP_AGENDADO_EM_EDICAO);
    });

    $('.btn-abandonar').click(function () {
        ModificarFormState($('select#status').val());
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

function ValidarLinhaEquipamento(){
    var valSelected = $("select#linhaEquipamento").val();
    if (valSelected) {
        return BuscarMinimoEMaximoPecas(valSelected);
    } else {
        return false;
    }
}

function BuscarMinimoEMaximoPecas(linhaEquipamentoId){
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

    if (produtoqtd < $minimoPecas ){
        return false;
    } else if (produtoqtd > $maximoPecas ) {
        return false;
    } else {
        return true;
    }
}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

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
        InitializeAllPeoplePickers()
    ).then(function () {
        InstanciarDateTimePicker();
        RegistrarBindings();
        ResetarAgendamento();
        RegistrarBotoes();

        if (getUrlParameter('action') == 'new') {
            ModificarFormState(EM_CRIACAO);
        } else if (getUrlParameter('action') == 'edit') {
            CarregarAgendamento(getUrlParameter('loteid'));

            CarregarHistorico(10267).then(function (registros) {
                $.fn.dataTable.ext.errMode = 'throw';

                $('#data-table').DataTable({
                    data: registros,
                    columns: [
                        { data: 'id', title: 'ID' },
                        { data: 'title', title: 'Ação' },
                        { data: 'area', title: 'Área' },
                        { data: 'mensagem', title: 'Mensagem' },
                        { data: 'author', title: 'Criado por' },
                        { data: 'created', title: 'Criado' }
                    ],
                    language: {
                        decimal: ',',
                        thousands: '.',
                        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json'
                    },
                    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
                    order: [[0, 'desc']],
                });
            });
        }
    });
});
