import React, { createContext, useContext, useEffect, useState } from "react";
import myAxios from "../../lib/axios";
import { useAuth } from "../AuthProvider";
import { alert } from "../../lib/actions/alert.actions";

export const ClubContext = createContext({
  clubs: [],
  clubLoading: false,
  clubFailed: false,
  clubForm: {},
  clubFormEdit: {},
  addClub: () => {},
  getClubs: () => {},
  editClub: () => {},
  deleteClub: () => {},
  handleClubForm: () => {},
  setClubFormEdit: () => {},
});

const ClubProvider = ({ children }) => {
  const { user } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [clubLoading, setClubLoading] = useState(false);
  const [clubFailed, setClubFailed] = useState(false);
  const [clubForm, setClubForm] = useState({
    Name: "",
    Contact: "",
    Descr: "",
    Image: "",
  });
  const [clubFormEdit, setClubFormEdit] = useState({
    Name: "",
    Contact: "",
    Descr: "",
    Image: "",
    ID: "",
  });

  const handleClubForm = (e) => {
    setClubFormEdit((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getClubs = async () => {
    setClubLoading(true);
    try {
      const { data } = await myAxios.get("/api/club", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      setClubs(data.result);
      setClubFailed(false);
    } catch (error) {
      console.log("ERROR IN GET CLUBS", error);
      setClubFailed(true);
    } finally {
      setClubLoading(false);
    }
  };

  const addClub = async () => {
    const formData = new FormData();
    Object.keys(clubFormEdit).forEach(key => {
        formData.append(key, clubFormEdit[key]);
    });
    try {
      await myAxios.post("/api/club", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Клуб амжилттай нэмэгдлээ", "success");
      getClubs();
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };

  const editClub = async (id) => {
    setClubLoading(true);
    try {
      await myAxios.put(`/api/club/${id}`, clubFormEdit, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Амжилттай өөрчлөгдлөө", "success");
      getClubs();
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    } finally {
      setClubLoading(false);
    }
  };

  const deleteClub = async (id) => {
    setClubLoading(true);
    try {
      await myAxios.delete(`/api/club/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      alert("Клуб амжилттай устгагдлаа", "success");
      getClubs();
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    } finally {
      setClubLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getClubs();
    }
  }, [user]);

  return (
    <ClubContext.Provider
      value={{
        clubs,
        clubLoading,
        clubFailed,
        clubForm,
        clubFormEdit,
        addClub,
        getClubs,
        editClub,
        deleteClub,
        handleClubForm,
        setClubFormEdit,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};

export default ClubProvider;

export const useClub = () => {
  return useContext(ClubContext);
};