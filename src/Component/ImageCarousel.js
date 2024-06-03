import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

function ImageCarousel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://dirums.com/_next/image?url=https%3A%2F%2Fd2wmjgcwxowcvo.cloudfront.net%2Fdownload-2022.1.23_19.7.26-dirums-(dirums.com)%2Fmedia%2FMaa_Durga_collection_2.jpg&w=3840&q=75"  style={{ width: '100%', height: 'auto' }}
                    alt="First Image"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://dirums.com/_next/image?url=https%3A%2F%2Fd2wmjgcwxowcvo.cloudfront.net%2Fdownload-2022.1.23_19.7.26-dirums-(dirums.com)%2Fmedia%2FSCULPTURE_Collectiong_1.jpg&w=3840&q=75"  style={{ width: '100%', height: 'auto' }}
                    alt="Second Image"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://dirums.com/_next/image?url=https%3A%2F%2Fd2wmjgcwxowcvo.cloudfront.net%2Fdownload-2022.1.23_19.7.26-dirums-(dirums.com)%2Fmedia%2FModern_Abstract_Banner_1.jpg&w=3840&q=75"  style={{ width: '100%', height: 'auto' }}
                    alt="Third Image"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://dirums.com/_next/image?url=https%3A%2F%2Fd2wmjgcwxowcvo.cloudfront.net%2Fdownload-2022.1.23_19.7.26-dirums-(dirums.com)%2Fmedia%2FBuddha_Collection_Banner_1.jpg&w=3840&q=75"  style={{ width: '100%', height: 'auto' }}
                    alt="Fourth Image"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://dirums.com/_next/image?url=https%3A%2F%2Fd2wmjgcwxowcvo.cloudfront.net%2Fdownload-2022.1.23_19.7.26-dirums-(dirums.com)%2Fmedia%2FRadha_Krishna_Collection_Banner_1.jpg&w=3840&q=75" style={{ width: '100%', height: 'auto' }}
                    alt="Fivth Image"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default ImageCarousel;
