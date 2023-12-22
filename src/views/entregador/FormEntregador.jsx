import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, GridColumn, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import {mensagemErro, notifyError, notifySuccess } from '../../views/util/Util';

export default function FormEntregador() {

    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8082/api/entregador/" + state.id)
.then((response) => {
                           setIdEntregador(response.data.id)
                           setNome(response.data.nome)
                           setCpf(response.data.cpf)
                           setDataNascimento(response.data.dataNascimento)
                           setFoneCelular(response.data.foneCelular)
                           setFoneFixo(response.data.foneFixo)
            })
        }
}, [state])

function salvar() {

    let entregadorRequest = {
        nome: nome,
        cpf: cpf,
        dataNascimento: dataNascimento,
        foneCelular: foneCelular,
        foneFixo: foneFixo
    }

    if (idEntregador != null) { //Alteração:
        axios.put("http://localhost:8082/api/entregador/" + idEntregador, entregadorRequest)
        .then((response) => { console.log('Cliente alterado com sucesso.') })
        .catch((error) => { console.log('Erro ao alter um cliente.') })
    } else { //Cadastro:
        axios.post("http://localhost:8082/api/entregador", entregadorRequest)
        .then((response) => { notifySuccess('Cliente cadastrado com sucesso.') })
        .catch((error) => {  if (error.response) {
            notifyError(error.response.data.errors[0].defaultMessage)
            } else {
            notifyError(mensagemErro)
            }  })
    }
}

    return (

        <div>
<MenuSistema />

            <div style={{ marginTop: '3%' }}>

            <Container textAlign='justified' >

{ idEntregador === undefined &&
    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
}
{ idEntregador != undefined &&
    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
}

<Divider />


                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100" placeholder="Informe o título do produto"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='RG'>
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    required
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    required
                                    label='QTD Entregas Realizadas'
                                    width={6}>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={6}
                                >
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                >
                                </Form.Input>
                                <Form.Input fluid label='Número'>

                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                >
                                </Form.Input>
                                <Form.Input fluid label='Cidade'>
                                </Form.Input>
                                <Form.Input fluid label='CEP'>
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                {/*<Form.Select>
                                    <Form.Select.option>test</Form.Select.option>
    </Form.Select>*/}
                                <select name="UF" id="">
                                    <option value="PE">PE</option>
                                    <option value="RJ">RJ</option>
                                    <option value="DF">DF</option>
                                </select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input fluid label='Complemento'>
                                </Form.Input>
                            </Form.Group>
                            <label name="Ativo">
                                <strong>Ativo: </strong>
                                <Form.Group>
                                    <Form.Radio label='Sim'>
                                    </Form.Radio>
                                    <Form.Radio label='Não'>
                                    </Form.Radio>
                                </Form.Group>
                            </label>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div >
        </div >

    );

}