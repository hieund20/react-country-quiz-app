export const getRandomNumber = () => {
    const rndNum_1 = Math.floor(Math.random() * 249);

    let rndNum_2 = Math.floor(Math.random() * 249)
    while (rndNum_2 === rndNum_1) {
        rndNum_2 = Math.floor(Math.random() * 249);
    }

    let rndNum_3 = Math.floor(Math.random() * 249)
    while (rndNum_3 === rndNum_1 || rndNum_3 === rndNum_2) {
        rndNum_3 = Math.floor(Math.random() * 249);
    }

    let rndNum_4 = Math.floor(Math.random() * 249)
    while (rndNum_4 === rndNum_1 || rndNum_4 === rndNum_2 || rndNum_4 === rndNum_3) {
        rndNum_4 = Math.floor(Math.random() * 249);
    }

    return { rndNum_1, rndNum_2, rndNum_3, rndNum_4 }
}