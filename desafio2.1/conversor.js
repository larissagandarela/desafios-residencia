const readline = require('readline');

class CurrencyConverter {
    constructor() {
        this.internalExchangeRate = {};
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    getUrl(currency) {
        return `https://v6.exchangerate-api.com/v6/a5e90703b0e3c8ec611695e3/latest/${currency}`;
    }

    async fetchExchangeRate(url) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Sua conexão falhou. Não foi possível obter as informações!!!');
            }
            
            const exchangeRateData = await response.json();

            if (exchangeRateData.result === 'error') {
                throw new Error(this.getErrorMessage(exchangeRateData['error-type']));
            }

            return exchangeRateData;
        } catch (err) {
            console.error('Erro ao obter a taxa de câmbio:', err.message);
            throw err; 
        }
    }

    async getAvailableCurrencies() {
        try {
            const url = this.getUrl('USD'); 
            const exchangeRateData = await this.fetchExchangeRate(url);
            return Object.keys(exchangeRateData.conversion_rates);
        } catch (err) {
            console.error('Erro ao obter lista de moedas disponíveis:', err.message);
            return [];
        }
    }

    async startConversion() {
        try {
            const availableCurrencies = await this.getAvailableCurrencies();
            console.log('Moedas disponíveis:', availableCurrencies.join(' | '));
            console.log(); 

            const fromCurrency = await this.questionAsync('Digite a moeda de origem: ');
            if (fromCurrency === '') {
                this.rl.close();
                return;
            }
            if (fromCurrency.length !== 3 || !availableCurrencies.includes(fromCurrency.toUpperCase())) {
                throw new Error('Moeda de origem inválida.');
            }

            const toCurrency = await this.questionAsync('Digite a moeda de destino: ');
            if (toCurrency.length !== 3 || !availableCurrencies.includes(toCurrency.toUpperCase())) {
                throw new Error('Moeda de destino inválida.');
            }
            if (fromCurrency.toUpperCase() === toCurrency.toUpperCase()) {
                throw new Error('A moeda de origem não pode ser igual à moeda de destino.');
            }

            const amount = await this.questionAsync('Digite o valor a ser convertido: ');
            const parsedAmount = parseFloat(amount.replace(',', '.'));
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                throw new Error('O valor de entrada deve ser um número maior que zero.');
            }
            await this.convertCurrency(fromCurrency.toUpperCase(), toCurrency.toUpperCase(), parsedAmount.toFixed(2));
        } catch (err) {
            console.error('Erro ao iniciar conversão:', err.message);
        }
    }

    async convertCurrency(fromCurrency, toCurrency, amount) {
        try {
            const url = this.getUrl(fromCurrency);
            this.internalExchangeRate = { ...(await this.fetchExchangeRate(url)) };
            const conversionRate = this.internalExchangeRate.conversion_rates[toCurrency];
    
            if (!conversionRate) {
                throw new Error(`Não foi possível encontrar uma taxa de conversão para ${fromCurrency} para ${toCurrency}`);
            }
    
            const convertedAmount = (amount * conversionRate).toFixed(2);
            console.log(`Taxa de conversão de ${fromCurrency} para ${toCurrency}: ${conversionRate.toFixed(6)}`);
            console.log(`${amount} ${fromCurrency} equivale a ${convertedAmount} ${toCurrency}`);
        } catch (err) {
            console.error('Erro ao converter moeda:', err.message);
        } finally {
            this.rl.close();
        }
    }

    questionAsync(question) {
        return new Promise(resolve => {
            this.rl.question(question, answer => {
                resolve(answer);
            });
        });
    }
}

const converter = new CurrencyConverter();
converter.startConversion();
