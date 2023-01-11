import "./Benefits.css"

const Benefits = () => {

    return (
        <section className="o-section-benefits">
            <div className="for-desktop-only">
                <table className="benefits-table">
                    <tbody>
                        <tr>
                            <th className="benefits-table__column-1 benefits-table__header">Benefits</th>
                            <th className="benefits-table__spacer--1"></th>
                            <th className="benefits-table__column-2 benefits-table__header benefits-table__tier-col">Free</th>
                            <th className="benefits-table__spacer--1"></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Benefits