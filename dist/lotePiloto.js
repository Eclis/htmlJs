// Render and initialize the client-side People Picker.
function initializePeoplePicker(peoplePickerElementId) {

    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = true;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '280px';

    // Render and initialize the picker.
    // Pass the ID of the DOM element that contains the picker, an array of initial
    // PickerEntity objects to set the picker value, and a schema that defines
    // picker properties.
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
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

function AtualizarAgendamento(id) {
    var campos = [];

    $('#main [name]').each(function () {
        var $this = $(this);

        if($this.is('[type=checkbox]') && $this.val() != undefined) {
            campos.push([this.name, $this.val() == 'on']);
        } else if($this.val() != undefined) {
            campos.push([this.name, $this.val()]);
        }
    });

    var $promise = $.Deferred();
    CalcularCamposCalculados();

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

function CalcularCamposCalculados() {
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
                } else {
                    $elemento.val(this.value);
                }

                $elemento.change();
            });

            $promise.resolve();
        }
    });

    return $promise;
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

function EscolherAgendamento() {
    var agendamentoId = prompt('Digite o ID do agendamento');

    if (agendamentoId) {
        ResetarAgendamento();

        CarregarAgendamento(agendamentoId).fail(function (response) {
            alert('Ops., algo deu errado. Mensagem: ' + response.errorText);
        });
    }
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
    CalcularCamposCalculados();

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
}

function ResetarAgendamento() {
    $('#main [name]').each(function () {
        var $this = $(this);

        if ($this.is('[type=checkbox]')) {
            $this.attr('checked', false);
        } else {
            $this.val('');
        }

        $this.change();
    });

    $('select#status').val('Rascunho').change();
}

function initializeAllPeoplePickers() {
    initializePeoplePicker('peoplePickerRespDLPCL');
    initializePeoplePicker('peoplePickerRespEngEnvase');
    initializePeoplePicker('peoplePickerGerenteEngEnvase');
    initializePeoplePicker('peoplePickerRespEngFab');
    initializePeoplePicker('peoplePickerGerenteEngFab');
    initializePeoplePicker('peoplePickerRespInDF');
    initializePeoplePicker('peoplePickerGerenteInDF');
    initializePeoplePicker('peoplePickerRespInvDE');
    initializePeoplePicker('peoplePickerGerenteInvDE');
    initializePeoplePicker('peoplePickerRespQualidade');
    initializePeoplePicker('peoplePickerGerenteQualidade');
    initializePeoplePicker('peoplePickerRespFabrica');
    initializePeoplePicker('peoplePickerGerenteFabrica');
}

$(document).ready(function () {
    $.when(
        CarregarCategoriaProjeto(),
        CarregarFabricas(),
        CarregarLinhasDoProduto(),
        CarregarListaGrauComplexidade(),
        CarregarListaMotivos(),
        CarregarListaStatus(),
        CarregarListaTiposLotes()
    ).then(function () {
        ResetarAgendamento();
        initializeAllPeoplePickers();

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

        $("#produtoEnvioAmostras").change();

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
            var id = $('input[name="ID"]').val();

            if (id) {
                AtualizarAgendamento(id).then(function (response) {
                    CarregarAgendamento(response.record.attr('ows_ID')).then(function () {
                        alert("Agendamento Salvo");
                    });
                }).fail(function (response) {
                    alert('Ops., algo deu errado. Mensagem: ' + response.errorText);
                });
            } else {
                InserirAgendamento().then(function (response) {
                    CarregarAgendamento(response.record.attr('ows_ID')).then(function () {
                        alert("Agendamento Salvo");
                    });
                }).fail(function (response) {
                    alert('Ops., algo deu errado. Mensagem: ' + response.errorText);
                });
            }

            return false;
        });

        $('#btnCarregar').click(function () {
            EscolherAgendamento();
        });

        // if(!$('[type="text"][name="ID"]').val()) {
        //     EscolherAgendamento();
        // }

        $('.date-time-picker').daterangepicker({
            opens: 'center',
            singleDatePicker: true,
            showDropdowns: true,
            timePicker: true,
            timePicker24Hour: true,
            locale: {
                format: 'DD/MM/YYYY HH:mm',
                applyLabel: "Apply",
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

        CarregarHistorico(10267).then(function (registros) {
            $.fn.dataTable.ext.errMode = 'throw';

            $('#data-table').DataTable({
                data: registros,
                columns: [
                    { data: 'id', title: 'ID'},
                    { data: 'title', title: 'Ação' },
                    { data: 'area', title: 'Área' },
                    { data: 'mensagem', title: 'Mensagem' },
                    { data: 'author', title: 'Criado por' },
                    { data: 'created', title: 'Criado'}
                ],
                language: {
                    decimal: ',',
                    thousands: '.',
                    url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json'
                },
                lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
                order: [[ 0, 'desc' ]],
            });
        });
    }).fail(function () {

    });
});
