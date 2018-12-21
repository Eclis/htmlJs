function initializePeoplePicker(peoplePickerElementId, Users) {
    if (typeof (Users) == 'undefined') Users = null;
    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = false;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '280px';
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, Users, schema);
}

function registerPPOnChangeEvent(ppElement) {
    var ppId = ppElement.attr('id') + "_TopSpan";
    console.log(ppId);

    //var addOnChanged = function(ctx) {
    if (SPClientPeoplePicker &&
        SPClientPeoplePicker.SPClientPeoplePickerDict &&
        SPClientPeoplePicker.SPClientPeoplePickerDict[ppId]) {

        console.log("In registerPPOnChangeEvent if");

        var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[ppId];
        picker.oldChanged = picker.OnControlResolvedUserChanged;

        console.log("picker");
        console.log(picker);
        //OnControlResolvedUserChanged
        picker.OnControlResolvedUserChanged = function () {
            if (picker.TotalUserCount == 0) {
                $('#resolvedUsers').html("");
                $('#userKeys').html("");
                $('#userProfileProperties').html("");
                $('#userID').html("");
            } else {
                setTimeout(function () {
                    getUserInfo();
                },
                    100);
            }
            picker.oldChanged();
        }
    } else {
        setTimeout(function () { addOnChanged(ctx); }, 100);
        console.log("In registerPPOnChangeEvent else");
    }
    //}
}
// Query the picker for user information.
function getUserInfo() {

    // Get the people picker object from the page.
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;

    // Get information about all users.
    var users = peoplePicker.GetAllUserInfo();
    console.log(users);
    var owner = users[0];
    console.log(owner);
    $("#siteOwenerEmail").val(owner.AutoFillSubDisplayText);
    $("#siteOwenerClaim").val(owner.Key);
    $("#siteOwenerName").val(owner.DisplayText);
    $("#siteOwenerLogin").val(owner.Description);
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
    $("#siteOwenerId").val(this.user.get_id());
}

function onFail(sender, args) {
    alert('Query failed. Error: ' + args.get_message());
}

function InserirAgendamento() {
    var campos = [];

    $('#main [name]').each(function () {
        var $this = $(this);

        if ($this.is('[type=checkbox]') && $this.val() != undefined) {
            campos.push([this.name, $this.val() == 'on']);
        } else if ($this.val() != undefined) {
            campos.push([this.name, $this.val()]);
        }
    });

    var $promise = $.Deferred();

    $().SPServices({
        operation: "UpdateListItems",
        async: false,
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

    return $promise;
};

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

            if (!$registro.size()) {
                $promise.reject({
                    errorCode: '0x99999998',
                    errorText: 'Registro não encontrado'
                });

                return;
            }

            var atributos = $registro.get(0).attributes;

            $.each(atributos, function () {
                var $elemento = $('#main [name=' + this.name.substr(4) + ' i]');

                if ($elemento.is('[type=checkbox]')) {
                    $elemento.attr('checked', this.value == "1");
                    $elemento.change();
                } else {
                    $elemento.val(this.value);
                }
            });

            $promise.resolve();
        }
    });

    return $promise;
};

function ResetarAgendamento() {
    $('#main [name]').each(function () {
        var $this = $(this);

        if ($this.is('[type=checkbox]')) {
            $this.attr('checked', false);
            $this.change();
        } else {
            $this.val('');
        }
    });
}

function CarregarLinhasEquipamentos(fabrica, tipoLote) {
    var $promise = $.Deferred();

    $().SPServices({
        operation: 'GetListItems',
        listName: 'Linhas e Equipamentos',
        CAMLQuery: '<Query><Where><And><And><Eq><FieldRef Name="Ativa" /><Value Type="Boolean">1</Value></Eq><Eq><FieldRef Name="Fabrica" /><Value Type="Lookup">' + fabrica + '</Value></Eq></And><Eq><FieldRef Name="TipoLote" /><Value Type="Choice">' + tipoLote + '</Value></Eq></And></Where></Query>',
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
                $('select#linhaEquipamento').append('<option value="' + $(this).attr("ows_ID") + '">' + $(this).attr("ows_Title") + '</option>')
            })

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
            })

            $promise.resolve();
        }
    });

    return $promise;
}

function CarregarListaGrauComplexidade() {
    $().SPServices({
        operation: 'GetList',
        listName: 'Agendamentos',
        completefunc: function (Data, Status) {
            if (Status == 'success') {
                $(Data.responseXML).find('Field[DisplayName="Grau de complexidade"] CHOICE').each(function () {
                    $('select#grauComplexidade').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
                });
            }
        }
    });
};

function CarregarListaStatus() {
    $().SPServices({
        operation: 'GetList',
        listName: 'Agendamentos',
        completefunc: function (Data, Status) {
            if (Status == 'success') {
                $(Data.responseXML).find('Field[DisplayName="Status"] CHOICE').each(function () {
                    $('select#status').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
                });
            }
        }
    });
};

function CarregarListaMotivos() {
    $().SPServices({
        operation: 'GetList',
        listName: 'Agendamentos',
        completefunc: function (Data, Status) {
            if (Status == 'success') {
                $(Data.responseXML).find('Field[DisplayName="Motivo"] CHOICE').each(function () {
                    $('select#motivo').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
                });
            }
        }
    });
};

function CarregarListaTiposLotes() {
    $().SPServices({
        operation: 'GetList',
        listName: 'Agendamentos',
        completefunc: function (Data, Status) {
            if (Status == 'success') {
                $(Data.responseXML).find('Field[DisplayName="Tipo de Lote"] CHOICE').each(function () {
                    $('select#tipoDeLote').append('<option value="' + this.innerHTML + '">' + this.innerHTML + '</option>');
                });
            }
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

function EscolherAgendamento() {
    var agendamentoId = prompt('Digite o ID do agendamento');

    if (agendamentoId) {
        ResetarAgendamento();

        CarregarAgendamento(agendamentoId).fail(function (response) {
            alert('Ops., algo deu errado. Mensagem: ' + response.errorText);
        });
    }
};

$(document).ready(function () {
    CarregarLinhasDoProduto();
    CarregarCategoriaProjeto();
    CarregarListaStatus();
    CarregarListaTiposLotes();
    CarregarListaMotivos();
    CarregarFabricas();
    CarregarListaGrauComplexidade();
    initializePeoplePicker('peoplePickerDiv');
    registerPPOnChangeEvent($('#peoplePickerDiv'));




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

    $('#btnSalvar').click(function () {
        InserirAgendamento().then(function (response) {
            CarregarAgendamento(response.record.attr('ows_ID')).then(function () {
                alert("Agendamento Salvo como rascunho");
            });
        }).fail(function (response) {
            alert('Ops., algo deu errado. Mensagem: ' + response.errorText);
        });

        return false;
    });

    $('#btnCarregar').click(function () {
        EscolherAgendamento();
    });

    // if(!$('[type="text"][name="ID"]').val()) {
    //     EscolherAgendamento();
    // }
});