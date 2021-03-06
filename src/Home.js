import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  Button,
  Badge,
  Container,
  Row,
  Col,
  CardTitle,
  CardFooter,
} from "shards-react";
import One from "./one.png";
import Two from "./Two.png";
import Three from "./three.png";
import Four from "./four.png";

import "./Home.css";
import Step1 from "./Step1.png";
import Step2 from "./Step2.png";
import Step3 from "./Step3.png";
import Step4 from "./Step4.png";
import PoolTogether from "./pooltogether.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBrain,
  faUser,
  faWallet,
  faMoneyBillWave,
  faForward,
  faArrowRight,
  faCopy,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import GridLoader from "react-spinners/GridLoader";
import scrollToComponent from "react-scroll-to-component";

import "./Hover.css";
import Pool1 from "./Pool1.png";
import Pool2 from "./Pool2.png";
import Buy1 from "./Buy1.png";
import Buy2 from "./Buy2.png";
import Buy3 from "./Buy3.png";
import PoolSymbol from "./PoolSymbol.svg";
import BuyModal from "./components/BuyModal";
import ScrollAnimation from "react-animate-on-scroll";

import {
  getWeb3,
  getAutheremInstance,
  depositToPoolTogether,
  getEstimatedPrize,
} from "./services";
import { getShortAddress } from "./utils";
import copy from "clipboard-copy";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      accounts: null,
      authereum: null,
      isCreatingAccount: false,
      buyingPoolToken: false,
      estimatedPrize: 0,
      amount: 0,
      isDepositingAmount: false,
      isDepositDone: false
    };
    this.buyToggle = this.buyToggle.bind(this);
    this.createEthAddress = this.createEthAddress.bind(this);
    this.getBuyAmount = this.getBuyAmount.bind(this);
    this.depositAmount = this.depositAmount.bind(this);
  }

  async componentDidMount() {
    const estimatedPrize = await getEstimatedPrize(
      "0x29fe7D60DdF151E5b52e5FAB4f1325da6b2bD958"
    );
    this.setState({ estimatedPrize });
  }

  async depositAmount() {
    this.setState({ isDepositingAmount: true })
    await depositToPoolTogether(this.state.amount);
    this.setState({ isDepositingAmount: false, isDepositDone: true })
  }

  async getBuyAmount(amount) {
    console.log("amount", amount);
    this.setState({ amount });
    console.log(this.state, "this.state");
  }

  async createEthAddress() {
    console.log("CLicked");

    let accounts;

    this.setState({ isCreatingAccount: true });
    accounts = await getWeb3();
    console.log("this.accounts", accounts);

    const authereum = await getAutheremInstance();
    console.log("got authereum");
    this.setState({
      accounts: accounts,
      authereum: authereum,
    });

    console.log("state", this.state);
  }

  buyToggle() {
    if (!this.state.accounts) {
      return;
    }

    this.setState({
      open: !this.state.open,
      buyingPoolToken: !this.state.buyingPoolToken,
    });
    console.log("Toggle", this.state.open);
  }

  render() {
    return (
      <div className="Background">
        <div className="Image">
          <center>
            <img className="Logo" src={PoolTogether} />

            <h2 className="TagLine">
              You could win{" "}
              <span className="One"> ${this.state.estimatedPrize} </span> every
              week just by saving your money
            </h2>

            <div className="Space">
              <Button
                onClick={() =>
                  scrollToComponent(this.StepCards, {
                    offset: 0,
                    align: "top",
                    duration: 1500,
                  })
                }
                className="LearnButton"
                outline
                pill
                theme="info"
              >
                Wanna Learn More <FontAwesomeIcon icon={faGraduationCap} />
              </Button>
              <Button
                className="LearnButton1"
                outline
                pill
                theme="info"
                onClick={() =>
                  scrollToComponent(this.HowCards, {
                    offset: 0,
                    align: "top",
                    duration: 1500,
                  })
                }
              >
                Already Know Enough <FontAwesomeIcon icon={faBrain} />
              </Button>
              <Button className="LearnButton2" outline pill theme="info">
                <a href="https://www.pooltogether.com/" className="Link2">
                  Launch PoolTogether
                </a>{" "}
                <img className="Symbol" width="8%" src={PoolSymbol} />
              </Button>
            </div>
          </center>
        </div>
        <section
          className="StepCards"
          ref={(section) => {
            this.StepCards = section;
          }}
        >
          <center>
            <h1 className="MainHeads">What is PoolTogether?</h1>{" "}
          </center>
          <Container className="Container5">
            <Row>
              <Col sm="12" lg="6">
                <ScrollAnimation animateIn="bounceInLeft">
                  <div className="ImagesStep">
                    <img height="55%" width="auto" src={Step1} />
                  </div>
                </ScrollAnimation>{" "}
              </Col>
              <Col sm="12" lg="6">
                <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
                  <div className="Smthng hvr-bounce-in">
                    <h2 className="StepNum">Step 1</h2>
                    <h4 className="StepName">
                      Deposit some Dollars with Others
                    </h4>
                    <p className="Para">
                      You have to deposit some Dollars to Pool Together.
                      Meanwhile others also do the same. All the amount is safely
                      deposited to Pool Together's Contract
                    </p>

                    <h5
                      onClick={() =>
                        scrollToComponent(this.Smthng2, {
                          offset: 0,
                          align: "top",
                          duration: 1500,
                        })
                      }
                      className="Next"
                    >
                      Next{" "}
                      <FontAwesomeIcon
                        className="icon hvr-icon-pulse"
                        icon={faForward}
                      />{" "}
                    </h5>
                  </div>
                </ScrollAnimation>
              </Col>
            </Row>
          </Container>

          <Container className="Container5">
            <Row>
              <Col sm="12" lg="6">
                <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
                  <div
                    className="Smthng2 hvr-bounce-in"
                    ref={(section) => {
                      this.Smthng2 = section;
                    }}
                  >
                    <h2 className="StepNum">Step 2</h2>
                    <h4 className="StepName">Sit Back And Relax</h4>
                    <p className="Para">
                      This is all you need to do now. From now on your entry to
                      the next and any future draws is taken automatically by the
                      system while you can relax and focus on your work.
                    </p>
                    <h5
                      onClick={() =>
                        scrollToComponent(this.Smthng3, {
                          offset: 0,
                          align: "top",
                          duration: 1500,
                        })
                      }
                      className="Next"
                    >
                      Next{" "}
                      <FontAwesomeIcon
                        className="icon hvr-icon-pulse"
                        icon={faForward}
                      />{" "}
                    </h5>
                  </div>
                </ScrollAnimation>
              </Col>
              <Col sm="12" lg="6">
                <ScrollAnimation animateIn="bounceInRight">
                  <div className="ImagesStep">
                    <img height="55%" width="auto" src={Step2} />
                  </div>
                </ScrollAnimation>
              </Col>
            </Row>
          </Container>

          <Container className="Container5">
            <Row>
              <Col sm="12" lg="6">
                <ScrollAnimation animateIn="bounceInLeft">
                  <div className="ImagesStep">
                    <img height="55%" width="auto" src={Step3} />
                  </div>
                </ScrollAnimation>
              </Col>
              <Col sm="12" lg="6">
                <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
                  <div
                    ref={(section) => {
                      this.Smthng3 = section;
                    }}
                    className="Smthng3 hvr-bounce-in"
                  >
                    <h2 className="StepNum">Step 3</h2>
                    <h4 className="StepName">
                      {" "}
                      Get the Prize Results delivered to you
                    </h4>
                    <p className="Para">
                      Every time there is a new draw, the prize result is
                      delivered right to your inbox or you can always visit the
                      Pool Together site to check the prize.
                    </p>
                    <h5
                      onClick={() =>
                        scrollToComponent(this.Smthng4, {
                          offset: 0,
                          align: "top",
                          duration: 1500,
                        })
                      }
                      className="Next"
                    >
                      Next{" "}
                      <FontAwesomeIcon
                        className="icon hvr-icon-pulse"
                        icon={faForward}
                      />{" "}
                    </h5>
                  </div>
                </ScrollAnimation>
              </Col>
            </Row>
          </Container>

          <Container className="Container5">
            <Row>
              <Col sm="12" lg="6">
                <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
                  <div
                    ref={(section) => {
                      this.Smthng4 = section;
                    }}
                    className="Smthng4 hvr-bounce-in"
                  >
                    <h2 className="StepNum">Step 4</h2>
                    <h4 className="StepName">Don't Worry About your Tickets</h4>
                    <p className="Para">
                      While the winner gets the reward, your tickets are never
                      lost. You can always redeem the initial amount of tokens
                      you deposited to the app. Without ever losing anything.
                    </p>
                    <h5
                      onClick={() =>
                        scrollToComponent(this.HowCards, {
                          offset: 0,
                          align: "top",
                          duration: 1500,
                        })
                      }
                      className="Next"
                    >
                      Lets Begin
                      <FontAwesomeIcon
                        className="icon hvr-icon-pulse"
                        icon={faArrowRight}
                      />{" "}
                    </h5>
                  </div>
                </ScrollAnimation>
              </Col>
              <Col sm="12" lg="6">
                <ScrollAnimation animateIn="bounceInRight">
                  <div className="ImagesStep">
                    <img height="55%" width="auto" src={Step4} />
                  </div>
                </ScrollAnimation>
              </Col>
            </Row>
          </Container>
        </section>
        <section
          className="HowCards"
          ref={(section) => {
            this.HowCards = section;
          }}
        >
          <center>
            <h1 className="MainHeads">How To Do?</h1>{" "}
          </center>
          <Container>
            <Row>
              <Col>
                <Card
                  className="LastCards hvr-ripple-out"
                  style={{ maxWidth: "300px", maxHeight: "500px" }}
                >
                  <center>
                    {" "}
                    <CardImg
                      className="BuyImages"
                      width="auto"
                      height="180rem"
                      src={Buy2}
                    />
                  </center>
                  <CardBody>
                    <h6>
                      <span>
                        <img className="BuyNumber" src={One} />{" "}
                      </span>{" "}
                    </h6>
                    {!this.state.accounts && !this.state.isCreatingAccount ? (
                      <div>
                        {" "}
                        <CardTitle className="BuyTitle">
                          Create Your Etherum Account
                        </CardTitle>
                        <p className="Paragraph">New to Crypto?</p>
                      </div>
                    ) : null}
                    {this.state.accounts ? (
                      <div>
                        <center>
                          <CardTitle className="BuyTitle">
                            {" "}
                            Your Ethereum Address{" "}
                          </CardTitle>
                        </center>
                        <Button
                          onClick={() => copy(this.state.account[0])}
                          className="Join4"
                          outline
                          pill
                          theme="info"
                        >
                          {getShortAddress(this.state.accounts[0])}{" "}
                          <FontAwesomeIcon icon={faCopy} />
                        </Button>
                      </div>
                    ) : this.state.isCreatingAccount ? (
                      <div>
                        <center>
                          <h4> Creating Your Account </h4>
                        </center>
                        <center>
                          <GridLoader
                            size={10}
                            color={"#5f26c0"}
                            loading={this.state.isCreatingAccount}
                          />
                        </center>
                      </div>
                    ) : (
                      <Button
                        className="Join"
                        outline
                        pill
                        theme="info"
                        onClick={this.createEthAddress}
                      >
                        Create Account <FontAwesomeIcon icon={faUser} />
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card
                  className="LastCards hvr-ripple-out"
                  style={{ maxWidth: "300px", maxHeight: "500px" }}
                >
                  <center>
                    {" "}
                    <CardImg
                      className="BuyImages"
                      width="auto"
                      height="180rem"
                      src={Buy1}
                    />
                  </center>{" "}
                  <CardBody>
                    <h6>
                      <span>
                        <img className="BuyNumber" src={Two} />{" "}
                      </span>{" "}
                    </h6>
                    <CardTitle className="BuyTitle">
                      Buy Some Pool Token
                    </CardTitle>
                    <p className="Paragraph">
                      Easily Buy Tokens with Any Payment Method
                    </p>
                    {this.state.accounts ? (
                      this.state.buyingPoolToken ? (
                        <center>
                          <GridLoader
                            size={10}
                            color={"#5f26c0"}
                            loading={this.state.buyingPoolToken}
                          />
                        </center>
                      ) : (
                        <Button
                          className="Join2"
                          outline
                          pill
                          theme="info"
                          onClick={this.buyToggle}
                        >
                          Buy Token <FontAwesomeIcon icon={faWallet} />
                        </Button>
                      )
                    ) : (
                      <Button
                        disabled
                        className="Join1"
                        outline
                        pill
                        theme="info"
                      >
                        Buy Token <FontAwesomeIcon icon={faWallet} />
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card
                  className="LastCards hvr-ripple-out"
                  style={{ maxWidth: "300px", maxHeight: "500px" }}
                >
                  <center>
                    {" "}
                    <CardImg
                      className="BuyImages1"
                      width="auto"
                      height="100rem"
                      src={Buy3}
                    />
                  </center>{" "}
                  <CardBody>
                    <h6>
                      <span>
                        <img className="BuyNumber1" src={Three} />{" "}
                      </span>{" "}
                    </h6>
                    <CardTitle className="BuyTitle1">
                      Deposit To Pool Together
                    </CardTitle>
                    <p className="Paragraph">Ready To Invest Some Money?</p>
                    {this.state.isDepositingAmount ? (
                      <center>
                        <GridLoader
                        size={10}
                        color={"#5f26c0"}
                        loading={this.state.isDepositingAmount}
                      />
                      </center>
                    ) : this.state.amount > 0 ? (
                      
                        this.state.isDepositDone ? (
                          <p>Congrats! Deposit Done <FontAwesomeIcon icon={faCheckCircle} /> Got to PoolTogether to <a href="https://app.pooltogether.com">Know More</a></p>
                        ): (
                          <Button
                        className="Join1"
                        outline
                        pill
                        theme="info"
                        onClick={this.depositAmount}
                      >
                        Deposit Now <FontAwesomeIcon icon={faMoneyBillWave} />
                      </Button>
                        )
                      
                    ) : (
                      <Button
                        disabled
                        className="Join1 Join9"
                        outline
                        pill
                        theme="info"
                      >
                        Deposit Now <FontAwesomeIcon icon={faMoneyBillWave} />
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <BuyModal
          show={this.state.open}
          toggle={this.buyToggle}
          accounts={this.state.accounts}
          authereumInstance={this.state.authereum}
          getBuyAmount={this.getBuyAmount}
        />
        <footer className="Footer">
          <center>PoolTogether</center>
          <img className="FooterImage" src={PoolTogether} />
        </footer>
      </div>
    );
  }
}
