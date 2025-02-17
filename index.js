// readline - Используется для взаимодействия с пользователем через командную строку
const readline = require('readline').createInterface({
    input: process.stdin, // Чтение ввода с клавиатуры
    output: process.stdout // Вывод в консоль
});

// Функция для подсчёта дней
function CalculateDays(TargetYear){
    // Данная константа показывает точно время на данный момент
    const NowTime = new Date();
    // Данная константа возвращает точное время и дату, (Которую введёт пользователь) когда наступит новый год 
    const NewYearTime = new Date(TargetYear, 0, 1);

    //Возращает количество миллисекунд, прошедших с 1 января 1970 года и вычесляет разность мужду  годом указанным пользователем и нынешним временем
    const DiffInTime = NewYearTime.getTime() - NowTime.getTime();
    //По формуле переводим (до ближайшего целого)  колличество миллисекунд в колличество дней
    const DiffInDay = Math.floor(DiffInTime / (1000 * 60 * 60 * 24));

    return DiffInDay;
}

//Запрос у пользователя года и ожиданеи ответа
readline.question('Введите год, до которого нужно рассчитать количество дней: ', (Year) => {
    //преобразование введенной пользователем строки в целое число
    const TargetYear = parseInt(Year, 10);

    if(isNaN(TargetYear)){ //isNaN - Проверяем что вводит пользователь, если это строка является числом, то возращается значение false
        console.log('Введите корректный год!');
    }   else{
        //получаем текущее время
        const NowTime = new Date();
        //Получаем текущий год
        const CurrentYear = NowTime.getFullYear();


        if(TargetYear < CurrentYear){
            //если год меньше текущего
            const DaysAgo = CalculateDays(TargetYear);
            console.log(`Новый год в ${TargetYear} году был ${Math.abs(DaysAgo)} дней назад`);
        } else if(TargetYear === CurrentYear){
            //Если год равен текущему
            const DaysLeft = CalculateDays(TargetYear);
            if (DaysLeft >= 0 ){
                console.log(`До 1 января ${TargetYear} года осталось ${DaysLeft} дней.`);
            }else {
                const DaysAgo = CalculateDays(TargetYear);
                console.log(`Новый год в ${TargetYear} году уже прошел.Он был ${Math.abs(DaysAgo)} дней назад `);
            }
        }else{
            //если год больше текущего
             const DaysLeft = CalculateDays(TargetYear);
             console.log(`До 1 января ${TargetYear} года осталось ${DaysLeft} дней.`);
        } 
    }

    readline.close(); // Закрываем интерфейс

});