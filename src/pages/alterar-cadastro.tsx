import React from 'react';
import { GetStaticProps } from 'next';
import { FormProvider, useForm } from 'react-hook-form';
import { Container, Paper, Snackbar, Typography, Box } from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import {
    FormButtonSubmit,
    FormContainerStyled,
    FormTitle,
} from 'ui/components/inputs/UserForm/UserForm.style';
import {
    AdminForm,
    LocationForm,
} from 'ui/components/inputs/UserForm/UserForm';
import { useAlterarCadastro } from 'data/hooks/pages/useAlterarCadastro.page';
import Dialog from 'ui/components/feedback/Dialog/Dialog';

// import { Component } from '@styles/pages/alterar-cadastro.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Alterar Cadastro',
        },
    };
};

const AlterarCadastro: React.FC = () => {
    const {
        formMethods,
        onSubmit,
        onDeleteAccount,
        startDeleteAccount,
        isDeleteDialogOpen,
        snackbarMessage,
        setSnackbarMessage,
    } = useAlterarCadastro();

    return (
        <Container>
            <PageTitle
                title={'Alteração de Dados'}
                subtitle={
                    'Alteração dos dados cadastrais, troca de senha ou exclusão do local'
                }
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

                            <AdminForm />
                        </FormContainerStyled>
                    </Paper>

                    <Box sx={{ textAlign: 'center' }}>
                        <FormButtonSubmit>Alterar Dados</FormButtonSubmit>
                    </Box>
                </form>
            </FormProvider>

            <Paper sx={{ p: 2, my: 10 }}>
                <FormContainerStyled>
                    <FormTitle>Excluir local da plataforma</FormTitle>
                    <Typography>
                        Tem certeza que deseja excluir o local da plataforma?
                        Todos os itens cadastrados serão excluidos junto com o
                        local.
                    </Typography>
                    <Box sx={{ textAlign: 'right' }}>
                        <FormButtonSubmit
                            sx={{ alignSelf: 'flex-end' }}
                            type={'button'}
                            color={'error'}
                            variant={'outlined'}
                            onClick={startDeleteAccount}
                        >
                            Excluir local
                        </FormButtonSubmit>
                    </Box>
                </FormContainerStyled>
            </Paper>

            <Dialog
                isOpen={isDeleteDialogOpen}
                subtitle={'Confirmar exclusão?'}
                onConfirm={() => onDeleteAccount(true)}
                onClose={() => onDeleteAccount(false)}
            >
                Essa ação não pode ser desfeita
            </Dialog>

            <Snackbar
                open={snackbarMessage.length > 0}
                autoHideDuration={4000}
                message={snackbarMessage}
                onClose={() => setSnackbarMessage('')}
            />
        </Container>
    );
};

export default AlterarCadastro;
