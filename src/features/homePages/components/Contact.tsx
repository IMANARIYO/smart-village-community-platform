
import MyButton from '../../../components/MyButton'

function Contact() {
    return (
        <section id="contact" className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-4 text-primary-dark">
                    Get in touch with our team
                </h2>
                <p className="text-xl text-gray-600 mb-8 text-balance">
                    Have questions about Smart Village? Want to bring the platform to your community? Our team is here to help.
                </p>
                <MyButton
                    size="lg"
                    className="text-white font-semibold px-8 py-3 bg-primary-normal"

                >
                    Send Message
                </MyButton>
            </div>
        </section>
    )
}

export default Contact
