import { Fragment } from "react";
import ContactForm from "../components/contact/contact-form";
import Head from "next/head";
function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Contact</title>
        <meta name="description" content="메세지를 보내주세요"></meta>
      </Head>
      <ContactForm />;
    </Fragment>
  );
}
export default ContactPage;
