import axios from "axios";
import React, {useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";
import {mensagemErro, notifyError, notifySuccess } from '../../views/util/Util';

export default function FormFornecedor (){
    const { state } = useLocation();
    const [idFornecedor, setIdFornecedor] = useState();

    const [nome, setNome] = useState();
 const [endereco, setEndereco] = useState();
 const [dataFundacao, setDataFundacao] = useState();
 const [valorMercado, setValorMercado] = useState();
 const [paginaWeb, setPaginaWeb] = useState();
 const [contatoVendedor, setContatoVendedor] = useState();

 function salvar() {
    let fornecedorRequest = {
     nome: nome,
     endereco: endereco,
     dataFundacao: dataFundacao,
     valorMercado: valorMercado,
     paginaWeb: paginaWeb,
     contatoVendedor: contatoVendedor
    }
    if (idFornecedor != null) { //Alteração:
        axios.put("http://localhost:8082/api/cliente/" + idFornecedor, fornecedorRequest)
        .then((response) => { console.log('Cliente alterado com sucesso.') })
        .catch((error) => { console.log('Erro ao alter um cliente.') })
    } else { //Cadastro:
        axios.post("http://localhost:8082/api/cliente", fornecedorRequest)
        .then((response) => { notifySuccess('Cliente cadastrado com sucesso.') })
        .catch((error) => { if (error.response) {
            notifyError(error.response.data.errors[0].defaultMessage)
            } else {
            notifyError(mensagemErro)
            } 
             })
    }
    }
    
    return (

        <div>
<MenuSistema />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                  <h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    


                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
			                        onChange={e => setNome(e.target.value)}
                                />

                                 <Form.Input
                                    fluid
                                    label='Data Fundação'
                                    width={6}
                                >
                                    <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataFundacao}
                                        onChange={e => setDataFundacao(e.target.value)}
                                    /> 
                                </Form.Input>

                            </Form.Group>

                            <Form>
                            <Form.Input
                                    fluid
                                    label='Endereço'
                                    maxLength="100"
                                    value={endereco}
			                        onChange={e => setEndereco(e.target.value)}
                                />
                            </Form>
                            
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Valor de Mercador'
                                    width={4}
                                    placeholder="Ex: 123.99"
                                        value={valorMercado}
                                        onChange={e => setValorMercado(e.target.value)}
                                    
                                />

                                <Form.Input
                                    fluid
                                    label='Contatato fornecedor'
                                    width={14}
                                    value={contatoVendedor}
			                        onChange={e => setContatoVendedor(e.target.value)}
                                />

                            </Form.Group>

                        
                        </Form>

                        <Form>
                            <Form.Input
                            fluid
                            label = 'Página WEB'
                            value={paginaWeb}
                            onChange={e => setPaginaWeb(e.target.value)}
                            />
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-fornecedor'}>Voltar</Link>
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
            </div>
    )
}