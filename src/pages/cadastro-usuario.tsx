import React from 'react';
import { GetStaticProps } from 'next';
import { Container, Paper, Typography } from '@material-ui/core';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import {
    AdminForm,
    LocationForm,
} from 'ui/components/inputs/UserForm/UserForm';
import { FormProvider, useForm } from 'react-hook-form';
import {
    FormButtonSubmit,
    FormContainerStyled,
    FormTitle,
} from 'ui/components/inputs/UserForm/UserForm.style';
import { Box } from '@material-ui/system';
import { useCadastroUsuario } from 'data/hooks/pages/useCadastroUsuario.page';

// import { Component } from '@styles/pages/cadastro-usuario.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Cadastro de Usuario',
        },
    };
};

const CadastroUsuario: React.FC = () => {
    const { formMethods, onSubmit } = useCadastroUsuario();

    return (
        <Container>
            <PageTitle
                title={'Cadastrar-se na plataforma'}
                subtitle={'Primeiro vamos precisar de alguns dados pessoais'}
            />

            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <Paper sx={{ p: 2, mb: 5 }}>
                        <FormContainerStyled>
                            <FormTitle>Dados do local</FormTitle>

                            <LocationForm />
                        </FormContainerStyled>
                    </Paper>

                    <Paper sx={{ p: 2, mb: 5 }}>
                        <FormContainerStyled>
                            <FormTitle>
                                Dados do administrador do local
                            </FormTitle>

                            <AdminForm isRegister={true} />
                        </FormContainerStyled>
                    </Paper>

                    <Box sx={{ textAlign: 'center' }}>
                        <FormButtonSubmit>Cadastre-se</FormButtonSubmit>
                    </Box>
                </form>
            </FormProvider>
        </Container>
    );
};

export default CadastroUsuario;
