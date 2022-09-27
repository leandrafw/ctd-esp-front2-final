import { useEffect, useState } from "react";
import { AssinarImage, CloseButton as Close } from "../../assets";
import { obterNoticias } from "./fakeRest";
import {
  CloseButton,
  CardModal,
  ContainerModal,
  DescriptionModal,
  ImageModal,
  TituloModal,
  CardNoticia,
  DateCardNoticia,
  DescriptionCardNoticia,
  ImageCardNoticia,
  TituloCardNoticia,
  ContainerNoticias,
  ListaNoticias,
  TituloNoticias,
  BotaoLeitura,
  BotaoAssinar,
  ContainerTexto,
} from "./styled";

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  description: string;
  date: number | string;
  premium: boolean;
  image: string;
  descriptionCurto?: string;
}

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obterInformacoes = async () => {
      const resposta = await obterNoticias();

      const data = resposta.map((n) => {
        const titulo = n.titulo
          .split(" ")
          .map((str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
          })
          .join(" ");

        const hour = new Date();
        const minutes = Math.floor(
          (hour.getTime() - n.date.getTime()) / 60000
        );

        return {
          id: n.id,
          titulo,
          description: n.description,
          date: `Faz ${minutes} minutos`,
          premium: n.premium,
          image: n.image,
          descriptionCurto: n.description.substring(0, 100),
        };
      });

      setNoticias(data);
    };

    obterInformacoes();
  }, []);

  return (
    <ContainerNoticias>
      <TituloNoticias>Noticias dos Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <CardNoticia>
            <ImageCardNoticia src={n.image} />
            <TituloCardNoticia>{n.titulo}</TituloCardNoticia>
            <DateCardNoticia>{n.date}</DateCardNoticia>
            <DescriptionCardNoticia>
              {n.descriptionCurto}
            </DescriptionCardNoticia>
            <BotaoLeitura onClick={() => setModal(n)}>Ver más</BotaoLeitura>
          </CardNoticia>
        ))}
        {modal ? (
          modal.premium ? (
            <ContainerModal>
              <CardModal>
                <CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImageModal src={AssinarImage} alt="mr-burns-excelent" />
                <ContainerTexto>
                  <TituloModal>Assine a nossa newsletter</TituloModal>
                  <DescriptionModal>
                    Assine nossa newsletter e receba novidades de nossos
                    personagens favoritos
                  </DescriptionModal>
                  <BotaoAssinar
                    onClick={() =>
                      setTimeout(() => {
                        alert("Suscripto!");
                        setModal(null);
                      }, 1000)
                    }
                  >
                    Assinar
                  </BotaoAssinar>
                </ContainerTexto>
              </CardModal>
            </ContainerModal>
          ) : (
            <ContainerModal>
              <CardModal>
                <CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImageModal src={modal.image} alt="news-image" />
                <ContainerTexto>
                  <TituloModal>{modal.titulo}</TituloModal>
                  <DescriptionModal>{modal.description}</DescriptionModal>
                </ContainerTexto>
              </CardModal>
            </ContainerModal>
          )
        ) : null}
      </ListaNoticias>
    </ContainerNoticias>
  );
};

export default Noticias;
