import { AxiosRequestConfig } from 'axios';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { ApiService, ApiServiceHateoas } from 'data/services/ApiService';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';

export default function useApi<OutputType>(
    endPoint: string | null,
    config?: AxiosRequestConfig
): { data: OutputType | undefined; error: Error } {
    const { data, error } = useSWR<OutputType>(endPoint, async (url) => {
        const response = await ApiService(url, config);

        return response.data;
    });

    return { data, error };
}

export function useApiHateoas<OutputType>(
    links: ApiLinksInterface[] = [],
    name: string | null,
    config?: AxiosRequestConfig
): { data: OutputType | undefined; error: Error } {
    const { data, error } = useSWR<OutputType>(name, async (name) => {
        return new Promise((resolve) => {
            ApiServiceHateoas(links, name, async (request) => {
                const response = await request<OutputType>(config);
                resolve(response.data);
            });
        });
    });

    useEffect(() => {
        mutate(name);
    }, [links, name]);

    return { data, error };
}
