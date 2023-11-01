import React, { useState } from "react"
import { TextInput } from "../TextInput"
import styles from './UpdateUser.module.css'
import { useUpdateUserMutation } from "../../store/api/usersApi"


export const UpdateUser = ({user}) => {
	const [updateUser] = useUpdateUserMutation()
	const [userId, setUserId] = useState(user.id)
	const [firstName, setFirstName] = useState(user.firstName)
	const [lastName, setLastName]	= useState(user.lastName)
	const [feedback, setFeedback]	= useState('')
	const [submitted, setSubmitted] = useState(false)

	const submitHandler = () => {
		if (firstName !== '' && lastName !== '') {
			setFeedback(`Hej, ${firstName} ${lastName}, välkommen!`)
			setSubmitted(true)
			setFirstName('')
			setLastName('')
			setTimeout(() => {
				setFeedback('')
			}, 5000)

			updateUser({
				user: {
					id: userId,
					firstName: firstName,
					lastName: lastName
				}
			})

		} else {
			setSubmitted(false)
			setFeedback('Du måste fylla i alla fält!')
		}
	}

	return (
		<div className={styles.container} id="update-form">
			<h2>Uppdatera användare</h2>
            <TextInput
				id="id-input"
				value={user.id}
				placeholder={user.id}
				onChange={(event) => {
					setUserId(event.target.value)
				}}
			/>
			<TextInput
				id="firstname-input"
				value={firstName}
				placeholder={user.firstName}
				onInput={(event) => {
					setFirstName(event.target.value)
				}}
				onChange={(event) => {
					setFirstName(event.target.value)
				}}
			/>
			<TextInput
				id="lastname-input"
				value={lastName}
				placeholder={user.lastName}
				onInput={(event) => {
					setLastName(event.target.value)
				}}
				onChange={(event) => {
					setLastName(event.target.value)
				}}
			/>
			<button className={styles.submitButton} onClick={submitHandler}>Uppdatera användare</button>
			<p>{feedback}</p>
		</div>
	)
}
