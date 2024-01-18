// Author: Sbenduel
import axios from "axios";
//cambiare questo url quando avremo un server ufficiale da contattare
axios.defaults.baseURL = "http://localhost/";
const downloadVideo = async (id: number) => {
  try {
    console.log("id: ", id);
    const response = await axios.get(`/api/download-recordings/${id}`, {
      responseType: "blob", // Gestisce la risposta come file binario
    });

    // Crea un obj blob dai dati ricevuti e genera un url che lo identifica
    const url = window.URL.createObjectURL(new Blob([response.data]));
    // Crea un elemento "a" collegato all'url del blob
    const link = document.createElement("a");
    link.href = url;
    // Aggiunge ad "a" l'attributo download e lo fa cliccare e scaricare col nome di video.mp4
    link.setAttribute("download", "video.mp4");
    document.body.appendChild(link);
    link.click();
    // Elimina "a" e toglie dalla memoria il blob
    if (link.parentNode) link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Errore durante il download:", error);
  }
};

// questo componente dovrebbe stare dentro un parent, altrimenti diventa lungo come lo schermo, nel caso tolgiere w-full da button
export const DownloadButton = () => {
  return (
    <button
      onClick={() => downloadVideo(1)}
      type="button"
      className="group w-full py-2 px-4 font-bold bg-[#112d4e] hover:bg-[#0B1D32]  rounded-sm text-white inline-flex items-center justify-center  Gelion"
    >
      <img
        id="original-svg"
        className="h-8 w-8 mr-2 transition-transform transform-gpu group-hover:saturate-200 group-hover:contrast-125 group-hover:scale-110"
        src="../imgs/downloadSvg.svg"
        alt="Download"
      />
      Download video
    </button>
  );
};
