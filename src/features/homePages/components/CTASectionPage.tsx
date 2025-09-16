
import { Link } from 'react-router-dom'
import MyButton from '../../../components/MyButton'

function CTASection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--smart-village-primary)" }}>
                    Ready to Strengthen Your Community?
                </h2>
                <p className="text-xl text-gray-600 mb-8 text-balance">
                    Join thousands of villages already using Smart Village to improve communication, safety, and community
                    engagement
                </p>
                <Link to="/auth/signup">
                    <MyButton
                        size="lg"
                        className="text-black font-semibold px-8 py-3 bg-secondary-normal"

                    >
                        Get Started Today
                    </MyButton>
                </Link>
            </div>
        </section>
    )
}

export default CTASection
