dateCreated: 2020-12-01 17:55 CET
tags: react-native, android, mobile
isDraft: true

# Style the React-Native Picker Component

The plan:
* the iOS picker is very native, I never had to touch it and didnt hear iOS users complain
* a for in the code is needed though, the two ways a picker works on iOS and Android are vastly different
* styling the android picker is necessary

* explore the props allowed
* show how they map to the native component (esp. color is funny)


Must read blog post to start understanding how to style 
https://developer.android.com/guide/topics/ui/look-and-feel/themes?hl=en
Read it from begin to end, it's a rabbit hole but very teaching!


[The API reference for "androidx.appcompat.widget.AppCompatSpinner"][AppCompatSpinner] for the actual class used under the hood to implement the Picker.

first examples for how to style picker for android
https://stackoverflow.com/questions/38921492/how-to-style-the-standard-react-native-android-picker/39141949#39141949

android.R.styleable all the stylables ... not sure yet what this really is
https://developer.android.com/reference/android/R.styleable#Spinner_popupTheme

https://chromium.googlesource.com/android_tools/+/HEAD/sdk/sources/android-25/android/widget/Spinner.java

all things stylable 

https://chromium.googlesource.com/android_tools/+/HEAD/sdk/extras/android/support/v7/appcompat/res/values/attrs.xml

https://android.googlesource.com/platform/frameworks/base/+/refs/heads/master/core/res/res/values/styles.xml

[repo]: https://github.com/react-native-picker/picker
[open-styling-issues]: https://github.com/react-native-picker/picker/issues?q=is%3Aissue+is%3Aopen+style
[AppCompatSpinner]: https://developer.android.com/reference/androidx/appcompat/widget/AppCompatSpinner
