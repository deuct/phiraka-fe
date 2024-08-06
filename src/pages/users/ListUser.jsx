import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";

const ListUser = () => {
  const navigate = useNavigate();
  let counter = 0;
  const [userData, setUserData] = useState([]);

  const { logout } = useAuth();
  const handleLogout = async () => {
    logout();
  };

  const getData = async () => {
    const { data: response } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/list`,
      {
        headers: {},
      }
    );
    console.log(response);
    setUserData(response);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (username) => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/delete`, {
        username: username,
      })
      .then((res) => {
        if (res.status == 200) {
          Swal.fire({
            title: "Success",
            text: "Successfully delete user.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => window.location.reload());
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed",
          text: "Failed delete user.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        <h4 className="mt-3">Daftar User</h4>
        <hr />
        <Row>
          <Col>
            <div className="text-end mb-2">
              <Button
                type="button"
                variant="danger"
                className="me-2"
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={() => navigate("/users/add")}
              >
                + Add User
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table hovered bordered stripped>
              <tbody>
                <tr>
                  <td>No</td>
                  <td>Nama</td>
                  <td>Password</td>
                  <td>Ctime</td>
                  <td>Fungsi</td>
                </tr>
                {userData?.length > 0
                  ? userData.map((data) => {
                      counter++;
                      return (
                        <>
                          <tr key={data.username}>
                            <td>{counter}</td>
                            <td>{data.username}</td>
                            <td>{data.password}</td>
                            <td>{data.createtime}</td>
                            <td className="d-flex">
                              <Button
                                type="button"
                                class="btn-sm"
                                variant="primary"
                                onClick={() =>
                                  navigate(
                                    `/users/edit?username=${data.username}`
                                  )
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                type="button"
                                class="btn-sm"
                                variant="danger"
                                onClick={() => handleDelete(data.username)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  : ""}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListUser;
