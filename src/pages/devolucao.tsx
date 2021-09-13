import React from 'react';
import { GetStaticProps } from 'next';
import { FormProvider, useForm } from 'react-hook-form';
import { Container, Paper } from '@material-ui/core';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import {
    FormButtonSubmit,
    FormContainerStyled,
} from 'ui/components/inputs/UserForm/UserForm.style';
import { ObjectReturnForm } from 'ui/components/inputs/UserForm/UserForm';

// import { Component } from '@styles/pages/devolucao.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Devolução',
        },
    };
};

const Devolucao: React.FC = () => {
    const formMethods = useForm();
    return (
        <FormProvider {...formMethods}>
            <Container>
                <PageTitle
                    title={'Informar entrega de NOME OBJETO'}
                    subtitle={
                        'Entre com os dados da pessoa para o qual o objeto foi entregue'
                    }
                />

                <Paper sx={{ p: 2, mb: 5 }}>
                    <FormContainerStyled>
                        <ObjectReturnForm />

                        <FormButtonSubmit>Confirmar entrega</FormButtonSubmit>
                    </FormContainerStyled>
                </Paper>
            </Container>
        </FormProvider>
    );
};

export default Devolucao;
