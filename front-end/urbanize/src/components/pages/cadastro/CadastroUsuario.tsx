import React , {useState, useEffect, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import User from '../models/User';
import { cadastroUsuario } from '../services/Service';
import { Grid, Box, Typography, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './CadastroUsuario.css';

function CadastroUsuario() {

    let history = useHistory();
    const [confirmarSenha,setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nomeCompleto:'',
            usuario: '',
            foto: '',
            tipo: '',
            senha: ''
        }
        )

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nomeCompleto:'',
            usuario: '',
            foto: '',
            tipo: '',
            senha: ''
        }
        )

    useEffect(() => {
        if (userResult.id != 0) {
            history.push("/login")
        }
    }, [userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if(confirmarSenha == user.senha){
        cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
        alert('Usuario cadastrado com sucesso')
        }else{
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
        }
    }
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6}>
            <Box paddingLeft={8} paddingTop={8}>
					<img src="https://i.imgur.com/RT1rD7P.png" alt="" width='650px' height='650px'/>
					</Box>	
            </Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={18}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h2' gutterBottom color='textPrimary' component='h2' align='center' className='textos2'>Cadastrar</Typography>
                        <TextField value={user.nomeCompleto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nomeCompleto' label='nomeCompleto' variant='outlined' name='nomeCompleto' margin='normal' fullWidth />
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal'fullWidth />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth /> 
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/home' className='text-decorator-none'>
                                <Button variant='contained' className='botao2 btnCancelar'>
                                    Cadastrar
                                </Button>
                            </Link>
                            
                            <Button type='submit' variant='contained' className='btnCancelar'>
                                Cancelar
                            </Button>
                            
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CadastroUsuario;
