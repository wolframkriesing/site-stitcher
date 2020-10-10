# React Native Picker - Still Maintained?
slug: react-native-picker-still-maintained
dateCreated: 2020-10-10 21:04 CET
tags: react-native, mobile

I am wondering if the react-native Picker component is still maintained and if it is usable or if I am totally
looking at the wrong thing for using a picker for a mobile app.

<figure style="padding: 1rem;">
    <img src="../picker.jpeg" alt="Example of the Picker Component" width="300" class="sizeup-onhover-image scale2 origin-left-center" />
    <figcaption>Example of the Picker Component</figcaption>
</figure>


## The Data I Have

I collected some data points about the [React Native Picker](https://github.com/react-native-community/react-native-picker)
but I still don't know if this component is in wide use or not.

## npm Lists Many Downloads

On npm the package has [>67k downloads a week](https://www.npmjs.com/package/@react-native-community/picker)
which looks like there is some traction and many people are using it. That is my assumption.

<figure style="padding: 1rem;">
    <img src="../npm-picker-stats.png" alt="npm stats" width="300" class="sizeup-onhover-image scale2 origin-left-center" />
    <figcaption>npm stats of the Picker Component</figcaption>
</figure>


## Moved out of the RN Core

Last time I had used the picker component, it was part of the RN core.
In about 2017, as far as I understand from the issue's comments.
the Picker moved to 
[the community repo](https://github.com/react-native-community/react-native-picker#react-native-communitypicker),
where some formerly core components have moved.

## Unresolved Issues Stay

I used (at least) workarounds for 
[two](https://github.com/facebook/react-native/issues/7817#issuecomment-264837382) 
[issues](https://github.com/facebook/react-native/issues/9220#issuecomment-245546641)
in the Picker back in 2016. The Picker was still part of the RN core.
The issues were closed when the picker moved to the new 
[community repo](https://github.com/react-native-community/react-native-picker).

## Almost no Maintenance

Most [commits in the last months](https://github.com/react-native-community/react-native-picker/commits/master)
are about managing dependencies.
A lot of [issues are still open](https://github.com/react-native-community/react-native-picker/issues?page=2&q=is%3Aopen+is%3Aissue)
and knowing that the repo had moved in 2017 (I believe)
I assume the issues had not been moved from there to the new repo.
