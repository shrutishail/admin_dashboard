import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserView() {
    const params = useParams();
    const [user, setUser] = useState(null); // Changed to a single object instead of an array
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // On Load
        getUser();
        console.log("welcome to userview");
    }, []);

    let getUser = async () => {
        try {
            const response = await axios.get(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${params.id}`);
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);  // Handle loading state even if the request fails
        }
    }

    return (
        <>
            <div>UserView - {params.id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">UserView</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? 
                            <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt="Loading" />
                            :
                            user && (
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>E-Mail</th>
                                                <th>Country</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.country}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    );
}

export default UserView;
