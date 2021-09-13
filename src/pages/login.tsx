import React from 'react';
import { GetStaticProps } from 'next';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import { LoginForm } from 'ui/components/inputs/UserForm/UserForm';
import { FormProvider, useForm } from 'react-hook-form';
import { Container } from '@material-ui/core';
import {
    FormButtonSubmit,
    FormContainerStyled,
} from 'ui/components/inputs/UserForm/UserForm.style';
import useLogin from 'data/hooks/pages/useLogin.page';

// import { Component } from '@styles/pages/login.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Login',
        },
    };
};

const ObjectReturn: React.FC = () => {
    const { formMethods, externalServicesState, errorMessage, onSubmit } =
        useLogin();

    return (
        <FormProvider {...formMethods}>
            <Container>
                <PageTitle
                    title={'Realizar o login'}
                    subtitle={
                        'Realize o login para administrar os objetos cadastrados'
                    }
                />
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <FormContainerStyled>
                        <LoginForm />

                        <FormButtonSubmit>Entrar</FormButtonSubmit>
                    </FormContainerStyled>
                </form>
            </Container>
        </FormProvider>
    );
};

export default ObjectReturn;
