import * as yup from 'yup';
import { ValidationService } from './ValidationService';
import { DateService } from './DateService';

export const FormSchemaService = {
    login() {
        return yup
            .object()
            .shape({
                login: yup.object().shape({
                    email: yup.string().email('E-mail inválido'),
                    password: yup.string().min(8, 'Senha muito curta'),
                }),
            })
            .defined();
    },
    newObject() {
        return yup
            .object()
            .shape({
                nome: yup.string(),
                descricao: yup.string(),
            })
            .defined();
    },
    returnObject() {
        return yup
            .object()
            .shape({
                dono_nome: yup.string().min(3, 'Digite seu nome completo'),
                dono_cpf: yup
                    .string()
                    .test('cpf', 'CPF inválido', ValidationService.cpf),
            })
            .defined();
    },
    newLocationData() {
        return yup
            .object()
            .shape({
                local: yup.object().shape({
                    nome: yup.string(),
                    endereco: yup.string(),
                    contato: yup.string(),
                    descricao: yup.string(),
                }),
                usuario: yup.object().shape({
                    nome: yup.string().min(3, 'Digite seu nome completo'),
                    email: yup.string().email('E-mail inválido'),
                    password: yup.string().min(8, 'Senha muito curta'),
                    password_confirmation: yup
                        .string()
                        .min(8, 'Senha muito curta')
                        .oneOf(
                            [yup.ref('password'), null],
                            'As senhas não estão iguais'
                        ),
                }),
            })
            .defined();
    },
    locationData() {
        return yup
            .object()
            .shape({
                local: yup.object().shape({
                    nome: yup.string(),
                    endereco: yup.string(),
                    contato: yup.string(),
                    descricao: yup.string(),
                }),
                usuario: yup.object().shape({
                    nome: yup.string().min(3, 'Digite seu nome completo'),
                    email: yup.string().email('E-mail inválido'),
                    password: yup
                        .string()
                        .nullable()
                        .notRequired()
                        .test('min_password', 'Senha muito curta', (value) => {
                            if (value) {
                                return value.length >= 8;
                            }
                            return true;
                        }),
                    password_confirmation: yup
                        .string()
                        .nullable()
                        .notRequired()
                        .oneOf(
                            [yup.ref('password'), null],
                            'As senhas não estão iguais'
                        )
                        .test('min_password', 'Senha muito curta', (value) => {
                            if (value) {
                                return value.length >= 8;
                            }
                            return true;
                        }),
                }),
            })
            .defined();
    },
};
