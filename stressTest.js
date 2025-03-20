const autocannon = require('autocannon');

const url = 'http://localhost:3000/api/v1/users/updateBalance';

function runStressTest() {
    const instance = autocannon(
        {
            url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: 1,
                amount: -2,
            }),
            connections: 20,
            duration: 15,
            pipelining: 10,
        },
        finishedBench
    );

    autocannon.track(instance, {
        renderProgressBar: true,
        renderResultsTable: true,
    });
}

function finishedBench(err, res) {
    if (err) {
        console.error('Ошибка при запуске стресс-теста:', err.message);
        return;
    }

    console.log('Стресс-тест завершён!');
    console.log('Результаты:', res);
}

runStressTest();