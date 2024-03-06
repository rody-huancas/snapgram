import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

export const SingupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSignIn } = useSignInAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

    if(!newUser) {
      return toast({ title: "Ocurrió un error al registrarse, intente nuevamente." });
    }

    const session = await signInAccount({ email: values.email, password: values.password });

    if( !session ) {
      return toast({ title: "Ocurrió un error al registrarse, intente nuevamente." });
    }

    const isLoggedIn = await checkAuthUser();

    if( isLoggedIn ) {
      form.reset();
      navigate('/')
    }else {
      toast({ title: "Ocurrió un error al registrarse, intente nuevamente." });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Crear una nueva cuenta
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Para utilizar SnapGram, ingresa los datos de tu cuenta
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="username" render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de Usuario</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {
              isCreatingAccount ? (
                <div className="flex-center gap-2">
                  <Loader /> Cargando...
                </div>
              ): "Registrarse"
            }
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            ¿Ya tienes una cuenta? <Link to="/sign-in" className="text-primary-500 text-small ml-1">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
