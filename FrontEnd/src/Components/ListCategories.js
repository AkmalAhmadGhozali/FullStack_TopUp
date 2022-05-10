import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../Utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20, faStarHalfAlt, faGamepad } from '@fortawesome/free-solid-svg-icons';

const Icon = ({ nama }) => {
    if (nama === "Diamond") return <FontAwesomeIcon icon={faDiceD20} className="mr-2" />
    if (nama === "Starlight") return <FontAwesomeIcon icon={faStarHalfAlt} className="mr-2" />
    if (nama === "Joki") return <FontAwesomeIcon icon={faGamepad} className="mr-2" />

    return <FontAwesomeIcon icon={faDiceD20} className="mr-2" />
}

export default class ListCategories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get(API_URL + "categories")
            .then(res => {
                const categories = res.data;
                this.setState({ categories });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { categories } = this.state
        const { changeCategory, categoriYangDipilih } = this.props
        return (
            <Col md={2} mt="2">
                <h4><strong>Daftar Layanan</strong></h4>
                <hr />
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item
                            key={category.id} 
                            onClick={() => changeCategory(category.nama)}
                            className={categoriYangDipilih === category.nama && "category-aktif"}
                            style={{cursor: 'pointer'}}
                        >
                            <h5>
                                <Icon nama={category.nama} /> {category.nama}
                            </h5>
                        </ListGroup.Item>
                    ))}

                </ListGroup>
            </Col>
        );
    }
}