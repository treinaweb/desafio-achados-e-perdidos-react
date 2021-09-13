import React from 'react';
import { GetStaticProps } from 'next';
import { FormProvider, useForm } from 'react-hook-form';
import { Container, Paper } from '@material-ui/core';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import {
    FormButtonSubmit,
    FormContainerStyled,
} from 'ui/components/inputs/UserForm/UserForm.style';
import { NewObjectForm } from 'ui/components/inputs/UserForm/UserForm';
import useCadastroObjeto from 'data/hooks/pages/useCadastroObjeto.page';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import { useRouter } from 'next/router';

// import { Component } from '@styles/pages/cadastro-objeto.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Cadastro de Objeto',
        },
    };
};

const CadastroObjeto: React.FC = () => {
    const { formMethods, onSubmit, isDialogOpen } = useCadastroObjeto(),
        router = useRouter();

    return (
        <FormProvider {...formMethods}>
            <Container>
                <PageTitle
                    title={'Adicionar novo objeto'}
                    subtitle={
                        'Preencha os dados do objeto que deseja adicionar'
                    }
                />

                <Paper sx={{ p: 2, mb: 5 }}>
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <FormContainerStyled>
                            <NewObjectForm />

                            <FormButtonSubmit>Cadastrar</FormButtonSubmit>
                        </FormContainerStyled>
                    </form>
                </Paper>

                <Dialog
                    isOpen={isDialogOpen}
                    subtitle={'Objeto cadastrado com sucesso!'}
                    onClose={() => router.push('/gerenciamento-objetos')}
                    noConfirm
                />
            </Container>
        </FormProvider>
    );
};

export default CadastroObjeto;
