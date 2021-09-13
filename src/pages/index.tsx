import React from 'react';
import { GetStaticProps } from 'next';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import { Button, Container, Grid, TextField } from '@material-ui/core';
import { PageContainer } from '@styles/pages/index.styled';
import {
    FormButtonSubmit,
    FormContainerStyled,
} from 'ui/components/inputs/UserForm/UserForm.style';

// import { Component } from '@styles/pages/index.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: '',
        },
    };
};

const Index: React.FC = () => {
    return (
        <Container>
            <PageTitle
                title="Perdeu um objeto?"
                subtitle="Veja se o local onde perdeu seu objeto já está cadastrado na nossa plataforma"
            />

            <form action={'/lista-locais'}>
                <FormContainerStyled>
                    <TextField
                        label="Digite o nome do local"
                        fullWidth
                        name="q"
                    />
                    <FormButtonSubmit>Buscar</FormButtonSubmit>
                </FormContainerStyled>
            </form>
        </Container>
    );
};

export default Index;
