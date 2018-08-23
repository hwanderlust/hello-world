import React from 'react';

class About extends React.Component {

  render() {
    return (
      <div className='about-container'>
        <div className='about-wrapper'>

          <section className='align-left'>
            <img src='https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='hand holding small globe in nice landscape' className='left-img' />

            <div>
              <p>...a link was discovered between students’ <span>“multicultural engagement”</span>—the extent to which they adapted to and learned about new cultures—and their “integrative complexity,” their willingness and capacity to acknowledge competing perspectives on the same issue.</p>

              <p>Put more simply, those students who became highly engaged in other cultures during the program had an <span>easier time holding multiple, conflicting viewpoints in mind at the same time.</span> Their interactions with other cultures gifted them a breadth of <span>perspective</span> they didn’t have before.</p>
            </div>
          </section>

          <section className='align-right'>
            <div>
              <p>“Foreign experiences increase both cognitive flexibility and depth and integrativeness of thought, the ability to make deep connections between disparate forms,” says Adam Galinsky...</p>

              <p>Cognitive flexibility is the mind’s ability to jump between different ideas, a key component of creativity.</p>
            </div>

            <img src='https://images.pexels.com/photos/959058/pexels-photo-959058.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='woman with buddhist-looking monk at a temple' className='right-img' />
          </section>

          <section className='align-left'>
            <img src='https://images.pexels.com/photos/716107/pexels-photo-716107.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='colorful decorative plates' className='left-img' />

            <div>
              <p>But it’s not just about being abroad, Galinsky says: “The key, critical process is multicultural engagement, immersion, and adaptation. Someone who lives abroad and doesn’t engage with the local culture will likely get less of a creative boost than someone who travels abroad and really engages in the local environment.”</p>

              <span>In other words, going to Cancun for a week on spring break probably won’t make a person any more creative. But going to Cancun and living with local fishermen might.</span>
            </div>
          </section>

          <section  className='align-right'>
            <div>
              <p>Traveling may have other brain benefits, too. Mary Helen Immordino-Yang says that cross-cultural experiences have the potential to strengthen a person’s sense of self.</p>

              <p>“...psychological research has shown now is that the ability to engage with people from different backgrounds than yourself, and the ability to get out of your own social comfort zone, is helping you to build a strong and acculturated sense of your own self,” she says.</p>
            </div>

            <img src='https://images.pexels.com/photos/1211968/pexels-photo-1211968.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='holi celebration' className='right-img' />
          </section>

          <section className='align-left'>
            <img src='https://images.pexels.com/photos/6629/mountains-nature-sky-sunny.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='woman on rocky cliff happy with arms up' className='left-img' />

            <span>“Our ability to differentiate our own beliefs and values … is tied up in the richness of the cultural experiences that we have had.”</span>
          </section>

        </div>
      </div>
    )
  }
};

export default About;
