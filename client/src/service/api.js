const BASE_URL = "http://localhost:8080";

export const create = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/movie`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao criar o filme.");
        }

        const responseData = await response.json();
        console.log("Filme criado com sucesso:", responseData);
        return responseData; // Retornar os dados do filme criado para que o componente possa lidar com eles, se necessário
    } catch (error) {
        console.error("Erro ao criar o filme:", error);
        throw error; // Lançar o erro novamente para que o componente que chamou a função possa lidar com ele, se necessário
    }
};

export const list = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
        throw error;
    }
};
