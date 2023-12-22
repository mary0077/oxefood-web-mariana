import axios from "axios";
import React, {useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, TextArea } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

export default function FormProduto (){
    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();

    const [titulo, setTitulo] = useState();
    const [codigo, setCodigo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMin, setTempoEntregaMin] = useState();
    const [tempoEntregaMax, setTempoEntregaMax] = useState();
    const [listaCategoria, setListaCategoria] = useState([]);
    const [idCategoria, setIdCategoria] = useState();
 
    
    
    useEffect(() => {
         if (state != null && state.id != null) {
            axios.get("http://localhost:8082/api/produto/" + state.id)
                        .then((response) => {
                           setIdProduto(response.data.id)
                           setTitulo(response.data.titulo)
                           setDescricao(response.data.descricao)
                           setValorUnitario(response.data.valorUnitario)
                           setTempoEntregaMin(response.data.tempoEntregaMin)
                           setTempoEntregaMax(response.data.tempoEntregaMax)
                           setIdCategoria(response.data.categoria.id)
            })
        }
        axios.get("http://localhost:8082/api/categoriaproduto")
        .then((response) => {
            const dropDownCategorias = response.data.map(c => ({ text: c.descricao, value: c.id }));
            setListaCategoria(dropDownCategorias);
        })
 
     }, [state])

     function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }
    
        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

     function salvar() {

        let produtoRequest = {
            idCategoria: idCategoria,
            titulo: titulo,
            codigo:  parseInt(codigo),
            descricao: descricao,
            valorUnitario: parseFloat(valorUnitario),
            tempoEntregaMin: parseInt(tempoEntregaMin),
            tempoEntregaMax:parseInt(tempoEntregaMax)
        
        }

        console.log(produtoRequest)
 
        if (idProduto != null) { //Alteração:
            axios.put("http://localhost:8082/api/produto/" + idProduto, produtoRequest)
            .then((response) => { console.log('Produto alterado com sucesso.') })
            .catch((error) => { console.log('Erro ao alter um produto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8082/api/produto", produtoRequest)
            .then((response) => { console.log('Produto cadastrado com sucesso.') })
            .catch((error) => { console.log('Erro ao incluir o produto.') })
        }
 }
 

    return (
        <div>
        <MenuSistema />
        <div style={{marginTop: '3%'}}>


        <Container textAlign='justified' >

            <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

            <Divider />
            

        <div style={{marginTop: '4%'}}>
            <Form>
            <Form.Group widths='equal'>

<Form.Input
    width={200}
    required
    fluid
    label='titulo'
    value= {titulo}
    onChange={e => setTitulo(e.target.value)}
    maxLength="400"
/>

<Form.Input width={7}
    required
    fluid
    label='codigo de Produto'
    >
    <InputMask
        required
        mask="999999"
        value={codigo}
        onChange={e => setCodigo(e.target.value)}
    /> 
</Form.Input>
</Form.Group>

<Form.Select
	required
	fluid
	tabIndex='3'
	placeholder='Selecione'
	label='Categoria'
	options={listaCategoria}
	value={idCategoria}
	onChange={(e,{value}) => {
		setIdCategoria(value)
	}}
/>

               
<Form.Field
          control={TextArea}
          label='Descrição'
          placeholder='Informe a descrição do produto'
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <Form.Group>
        <Form.Input
                                    required
                                    fluid
                                    label='Valor '
                                    value={valorUnitario}
                                    onChange={e => setValorUnitario(e.target.value)}
                                    width={6}>                                   
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de entrega minimo em minutos'
                                    width={6}
                                    value={tempoEntregaMin}
                                    onChange={e => setTempoEntregaMin(e.target.value)}
                                    placeholder= '30'>

                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de entrega maximo em minutos'
                                    width={6}
                                    value={tempoEntregaMax}
                                    onChange={e => setTempoEntregaMax(e.target.value)}
                                    placeholder= '40'>
                               </Form.Input>
        </Form.Group>
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
                                Voltar
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
    );
}