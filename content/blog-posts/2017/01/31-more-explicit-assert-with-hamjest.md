dateCreated: 2017-01-31 18:11 CET
tags: testing, assertion, tdd, knowledgebase  
isDraft: true

# More explicit assert with hamjest

An undone blog post - More explicit assert with hamjest


      it('is true for a day that is a specialDay', () => {
        const isSpecialDay = specialDays()[2].isSpecialDay;
        assertThat(isSpecialDay, equalTo(true));
      });

      it('provides the special day\'s `name`', () => {
        const specialDay = specialDays()[2].specialDay;
        assertThat(specialDay, equalTo({ name: specialDayName }));
      });

vs.

      it('is true for a day that is a specialDay', () => {
        const day = specialDays()[2];
        assertThat(day, hasProperty('isSpecialDay', equalTo(true)));
      });

      it('provides the special day\'s `name`', () => {
        const day = specialDays()[2];
        assertThat(day, hasProperty('specialDay', equalTo({ name: specialDayName })));
      });

there is even a simple transformation in it

    assertThat(isSpecialDay, equalTo(true));

transforms into

    assertThat(day.isSpecialDay, equalTo(true));

makes it obvious, that when the lookup `day.isSpecialDay` fails we will get an error
message like `undefined does not equal to true` :(
so let's tranform it into

    assertThat(day, hasProperty('isSpecialDay', equalTo(true)));

and we will get: day has no property `isSpecialDay` which should equal to `true`

You might say, that's two assertion in on test, but I am fine with that
as long as the test reporter tells me all the things that are wrong.
Otherwise I would have to figure out in which order to solve failing tests.
