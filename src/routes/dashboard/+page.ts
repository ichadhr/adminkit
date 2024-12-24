import type { PageLoad } from './$types';

interface StockData {
    date: Date;
    value: number;
}

interface RawStockData {
    date: string;
    value: number;
}

interface PageData {
    readonly stockData: StockData[];
}

const defaultStockData: StockData[] = [];

export const load: PageLoad = async ({ fetch }): Promise<PageData> => {
    try {
        const response = await fetch('/api/dashboard.json');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch stock data: ${response.status} - ${errorText}`);
        }

        const rawData = await response.json() as RawStockData[];
        const stockData = rawData.map(item => ({
            date: new Date(item.date),
            value: item.value
        }));

        return { stockData };
    } catch (error) {
        console.error(
            'Error loading stock data:',
            error instanceof Error ? error.message : String(error)
        );
        return { stockData: defaultStockData };
    }
};