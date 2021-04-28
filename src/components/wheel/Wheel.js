import { Component } from 'react';

import api from '../../helpers/axios/api';

import WheelItem from './wheel-item/WheelItem';

import './Wheel.css';

class Wheel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wheelItems: []
        };
    }
    componentDidMount() {
        const rndPage = Math.round(Math.random() * (350 - 1) + 1);

        this.setState({
            wheelItems: []
        });

        api.get('photos?page=' + rndPage).then((r) => {
            if (r.data) {
                this.setState({ wheelItems: r.data });
                setTimeout(() => {
                    this.letsAnimate();
                }, 0);
            }
        });
    }
    letsAnimate() {
        let position = this.state.wheelItems.length / 2;
        let speed = 0;
        let rounded = 0;
        let diff = 0;
        let wheelEl = document.getElementById('wheel');
        let wheelItems = [...document.querySelectorAll('.wheel-item')];
        let heightElms = 100;
        let wheelElements = this.state.wheelItems;
        // the smaller the value the less elastic
        let bounce = 0.035;

        window.addEventListener('wheel', (e) => {
            speed += e.deltaY * 0.0002;
        });

        function raf() {
            position += speed;
            speed *= 0.8;
            rounded = Math.round(position);
            heightElms = wheelEl.offsetHeight / wheelItems.length;
            diff = rounded - position;

            if (rounded < 0 || rounded >= wheelItems.length) {
                diff = rounded < 0 ? 1 : -1;
            }

            position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.8) * bounce;

            wheelEl.style.transform = `translate(0, ${-position * heightElms}px)`;

            wheelElements.forEach((o, i) => {
                o.dist = Math.min(Math.abs(position - i), 1);
                o.dist = 1 - o.dist ** 2;

                wheelItems[i].style.opacity = `${0.1 + o.dist}`;
                wheelItems[i].style.transform = `scale(${1 + 0.15 * o.dist})`;
                wheelItems[i].style.zIndex = `${rounded === i ? 2 : 1}`;
            });

            window.requestAnimationFrame(raf);
        }

        raf();
    }
    render() {
        return (
            <div id="wheel">
                {this.state.wheelItems.length > 0 ? this.state.wheelItems.map((item) =>
                    <WheelItem
                        key={item.id}
                        value={item.urls.regular}
                        link={item.links.download}></WheelItem>
                ) : null}
            </div>
        );
    }
}

export default Wheel;