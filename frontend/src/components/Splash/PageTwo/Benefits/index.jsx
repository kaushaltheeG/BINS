import "./Benefits.css"
import DoneIcon from '@mui/icons-material/Done';

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
                        <tr className="benefits-table__row">
                            <td className="benefits-table__column-1">
                                <p className="benefits-table__feature--text">Unlimited messaging</p>
                            </td>
                            <td></td>
                            <td className="benefits-table__feature benefits-table__tier benefits-table__feature--1">
                                <p className="benefits-table__feature--text">Unlimited messaging</p>
                            </td>
                        </tr>
                        <tr className="benefits-table__row">
                            <td className="benefits-table__column-1">
                                <p className="benefits-table__feature--text">Collaborate with new teams</p>
                            </td>
                            <td></td>
                            <td className="benefits-table__feature benefits-table__tier ">
                                <DoneIcon />
                            </td>
                        </tr>
                        <tr className="benefits-table__row">
                            <td className="benefits-table__column-1">
                                <p className="benefits-table__feature--text">Instant Messaging</p>
                            </td>
                            <td></td>
                            <td className="benefits-table__feature benefits-table__tier ">
                                <DoneIcon />
                            </td>
                        </tr>
                        <tr className="benefits-table__row">
                            <td className="benefits-table__column-1">
                                <p className="benefits-table__feature--text">Be part of multiple work areas</p>
                            </td>
                            <td></td>
                            <td className="benefits-table__feature benefits-table__tier ">
                                <DoneIcon />
                            </td>
                        </tr>
                        <tr className="benefits-table__row">
                            <td className="benefits-table__column-1">
                                <p className="benefits-table__feature--text">Create group chats</p>
                            </td>
                            <td></td>
                            <td className="benefits-table__feature benefits-table__tier ">
                                <DoneIcon />
                            </td>
                        </tr>
                        <tr className="benefits-table__row">
                            <td className="benefits-table__column-1">
                                <p className="benefits-table__feature--text">Connect with new people</p>
                            </td>
                            <td></td>
                            <td className="benefits-table__feature benefits-table__tier ">
                                <DoneIcon />
                            </td>
                        </tr>
                        <tr className="benefits-table__row">
                            <td className="benefits-table__column-1">
                                <p className="benefits-table__feature--text">Collaborate with new teams</p>
                            </td>
                            <td></td>
                            <td className="benefits-table__feature benefits-table__tier ">
                                <DoneIcon />
                            </td>
                        </tr>
                        <tr className="benefits-table__row">
                            <td className="benefits-table__column-1">
                                <p className="benefits-table__feature--text">Create private pods</p>
                            </td>
                            <td></td>
                            <td className="benefits-table__feature benefits-table__tier benefits-table__feature--last">
                                <DoneIcon />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Benefits