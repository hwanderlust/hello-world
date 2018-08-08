import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider'

const Cable = ({conversations, handleReceivedMessage}) => {
  return (
    <Fragment>
      {conversations ? conversations.map(conversation => {
        return (
          <ActionCable key={conversation.id}
            channel={{ channel: 'MessagesChannel', conversation: conversation.id }}
            onReceived={handleReceivedMessage}
          />
        )
      }) : null }
    </Fragment>
  )
}

export default Cable
