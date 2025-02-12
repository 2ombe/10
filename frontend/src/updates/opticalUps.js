import React, { useContext, useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import LoadingBox from "../component/LoadingBox";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CooporateDetails() {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
  const { id: cooporateId } = params;
  const { userInfo } = state;
  const [cooporate, setCooporate] = useState({});
  const [loading, setLoading] = useState(true);
  const [regMembers, setRegMembers] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cooperateId, setCooperateId] = useState("");
  const [error, setError] = useState(null);
  const categoryId = cooporateId;

  const handleCreateInvoice = async () => {
    setLoading(true);
    try {
      await axios.post(
        "/api/invoices/create",
        { cooperateId: categoryId },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setShowModal(false);
      setCooperateId("");
      navigate("/invoices");
    } catch (error) {
      console.error("Error creating invoice:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async () => {
    try {
      const response = await axios.get(
        `/api/invoices/${invoice._id}/download`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
          responseType: "blob", // This ensures that the response is treated as a binary large object.
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${cooporateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      navigate("/invoice");
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `/api/invoices/${cooporateId}/invoice`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        setInvoice(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching invoice");
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [cooporateId, userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/cooporate/single/${cooporateId}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        setCooporate(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [cooporateId, userInfo]);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/members/${categoryId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setRegMembers(response.data);
      } catch (error) {
        setError("Error fetching members");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [categoryId, userInfo]);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : (
        <Row>
          {regMembers === null ? (
            <Button onClick={() => navigate(`/upload/members/${cooporateId}`)}>
              Add member
            </Button>
          ) : (
            <>
              {invoice === null ? (
                <Button onClick={() => handleCreateInvoice()}>
                  Create Invoice
                </Button>
              ) : (
                <Button onClick={() => handleDownloadInvoice()}>
                  Download Invoice
                </Button>
              )}
              <Button
                onClick={() => navigate(`/upload/members/${cooporateId}`)}
              >
                View member
              </Button>
            </>
          )}
        </Row>
      )}
    </div>
  );
}

export default CooporateDetails;
