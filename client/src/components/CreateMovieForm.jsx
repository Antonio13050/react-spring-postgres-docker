import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { create } from "../service/api";
import { Container, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./HeaderComponent";
import ListMovies from "./ListMovies";

export default function CreateMovieForm() {
    const NewMovieRegistrationSchema = z.object({
        name: z.string().min(1, "O nome é obrigatório"),
        release: z.coerce.date({
            errorMap: ({ code }, { defaultError }) => {
                if (code == "invalid_date")
                    return { message: "Selecione uma data válida" };
                return { message: defaultError };
            },
        }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(NewMovieRegistrationSchema),
    });

    let newMovie = {};

    const onSubmit = async (data) => {
        const releaseISOString = data.release.toISOString();

        newMovie = {
            name: data.name,
            release: releaseISOString,
        };

        console.log(newMovie);
        await create(newMovie)
            .then(() => {
                toast.success("Filme criado com sucesso.");
            })
            .catch(() => {
                toast.error("Erro ao criar o filme.");
            });
    };

    return (
        <>
            <Header />
            <Container>
                <ToastContainer position="bottom-right" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("name")}
                            placeholder="Nome"
                        />

                        {errors.name && (
                            <Form.Text className="text-danger">
                                {errors.name.message}.
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicRelease">
                        <Form.Label>Data de Lancamento</Form.Label>

                        <Form.Control type="date" {...register("release")} />

                        {errors.release && (
                            <Form.Text className="text-danger">
                                {errors.release.message}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <ListMovies onSubmit={onSubmit} />
            </Container>
        </>
    );
}
