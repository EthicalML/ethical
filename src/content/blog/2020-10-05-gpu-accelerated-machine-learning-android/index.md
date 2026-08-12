---
title: 'Supercharging your Mobile Apps: GPU Accelerated Machine Learning using Android NDK & Vulkan Kompute'
date: 2020-10-05
summary: 'A hands on tutorial that teaches you how to leverage your on-device phone GPU for accelerated data processing and machine learning using the Android NDK, Kompute and Vulkan.'
tags: [gpu, kompute, machine-learning, android]
source: external
url: 'https://medium.com/data-science/gpu-accelerated-machine-learning-in-your-mobile-applications-using-the-android-ndk-vulkan-kompute-1e9da37b7617'
---

Kompute in Android NDK (Image by Author)

Some smartphones nowadays pack laptop-level hardware — carrying up to 16GB RAM, high-speed multi-core CPUs, and GPUs that can render high-performance complex graphical applications on 4k displays.

Image by Author

Tapping into that power — especially the GPU processing power — for on-device data processing capabilities becomes growingly important as mobile hardware [only continues to improv](https://www.mobilemarketer.com/news/mobile-games-sparked-60-of-2019-global-game-revenue-study-finds/569658/)e. Recently, this has been opening exciting opportunities around [edge computing](https://en.wikipedia.org/wiki/Edge_computing), [federated architectures](https://en.wikipedia.org/wiki/Federated_architecture), [mobile deep learning](https://arxiv.org/abs/1910.06663), and more.

This article provides a technical deep dive that shows you how to tap into the power of mobile cross-vendor GPUs. You will learn how to use the [**Android Native Development Kit**](https://developer.android.com/ndk)and the [**Kompute framework**](https://github.com/EthicalML/vulkan-kompute) to write GPU optimized code for Android devices. The end result will be a mobile app created in Android Studio that is able to use a GPU accelerated machine learning model which we will write from scratch, together with a user interface that will allow the user to send the input to the model.

Android Studio Running Project in Emulator (Image by Author)

No background knowledge **beyond programming experience** is required, however if you are curious about the underlying AI / GPU compute concepts referenced, we suggest checking out our previous article, “[Machine Learning in Mobile & Cross-Vendor GPUs Made Simple With Kompute & Vulkan](https://towardsdatascience.com/machine-learning-and-data-processing-in-the-gpu-with-vulkan-kompute-c9350e5e5d3a)”.

You can find the full code in the [**example folder in the repository**](https://github.com/EthicalML/vulkan-kompute/tree/master/examples/android/android-simple)**.**

## Android Native Development Kit (NDK)

Android NDK Diagram (Image by Author)

The [Native Development Kit (NDK)](https://developer.android.com/ndk) is one of Android’s solution to address the increasing computational demands from mobile apps. The NDK framework enables developers to write low level, highly efficient C and C++ code that can interoperate with the Java/Kotlin application code through the popular [**Java Native Interface**](https://en.wikipedia.org/wiki/Java_Native_Interface)bindings.

This tooling enables mobile application developers not only to write highly efficient code, but also leverage existing optimized frameworks written in C++ for advanced data processing or machine learning.

## Enter Kompute & the Vulkan SDK

Playing “where’s waldo” with Khronos Membership (Image by Vincent Hindriksen via [StreamHPC](https://streamhpc.com/blog/2017-05-04/what-is-khronos-as-of-today/))

**Vulkan**is an Open Source project led by the [Khronos Group](https://www.khronos.org/), a consortium consisting of several tech companies who have come together to work towards defining and advancing the open standards for mobile and desktop media (and compute) technologies.

A large number of high profile (and new) frameworks have been adopting Vulkan as their core GPU processing SDK. The Android NDK’s main documentation page has a full section [**dedicated to Vulkan**](https://developer.android.com/ndk/guides/graphics), together with hands on examples showing how it can be used in Android mobile devices.

As you can imagine, the Vulkan SDK provides very low-level access to GPUs, which allows for very specialized optimizations. This is a great asset for data processing and GPU developers — the main disadvantage is the verbosity involved, requiring 500–2000+ lines of code to only get the base boilerplate required to even start writing the application logic. This can result in expensive developer cycles and errors that can lead to larger problems. This was one of the main motivations for us to start the **Kompute**project.

[**Kompute**](https://github.com/axsaucedo/vulkan-kompute#vulkan-kompute) is a framework built on top of the Vulkan SDK which abstracts a lot of boilerplate code required, introducing best practices that expose Vulkan’s computing capabilities. Kompute is the GPU computing framework that we will be using in this tutorial to build the machine learning module in our mobile Android app.

Kompute [Documentation](https://ethicalml.github.io/vulkan-kompute/) (Image by Author)

## Machine Learning in Mobile Development

In this post we will be building upon the Machine Learning use-case we created in the “[Machine Learning in Mobile & Cross-Vendor GPUs Made Simple With Kompute & Vulkan](https://towardsdatascience.com/machine-learning-and-data-processing-in-the-gpu-with-vulkan-kompute-c9350e5e5d3a)” article. We will not be covering the underlying concepts in as much detail as in that article, but we’ll still introduce the high level intuition required in this section.

To start with, we will need an interface that allows us to expose our Machine Learning logic, which will require primarily two functions:

1. `train(…)`— function which will allow the machine learning model to learn to predict outputs from the inputs provided
2. `predict(...)`— function that will predict the output of an unknown instance.

This can be visualised in the two workflows outlined in the image below.

Data Science Process (Image by Author)

Particularly in app development, this would also be [a common pattern](https://www.forbes.com/sites/forbestechcouncil/2020/08/03/how-machine-learning-is-powering-a-new-generation-of-app-development/#17c728f62a88) for machine learning workflows, for both predictive and explanatory modelling use cases. This often consists of leveraging data generated by your users as they interact directly (or indirectly) with the app itself. This data can then serve as training features for machine learning models. Training of new models can be performed through manual “offline” workflows that data scientists would carry out, or alternatively through automated triggers retraining models.

## Android Studio Project Overview

Project File Structure (Image by Author)

We will start by providing a high level overview of the core components in the Android Studio project, including the Kompute C++ bindings, the Android User Interface, the App logic build in Kotlin, and the build files required. If you are interested in a particular area you can jump to its respective section below.

You will need to make sure you install [**Android Studio**](https://developer.android.com/studio), and also install the [**Android NDK**](https://developer.android.com/ndk/guides#download-ndk)— the rest of the dependencies will be installed and configured automatically when opening the project in the IDE.

Now that you have everything installed, you are able to import the project. For this, you first have to clone the [**full Kompute repository**](https://github.com/EthicalML/vulkan-kompute) and import the Android Studio project under `examples/android/android-simple/`. You should now be able to see the project load and configure the build. Once it opens you are able to run it in an emulator or in your own physical Android phone. This project was tested in the Pixel 2 emulator, and in a physical Samsung Galaxy phone.

Final GPU Accelerated Kompute App (Image by Author)

When you load the project you will notice the following key components in the file structure, which we will be breaking down further in detail in the following sections:

- **Android SDK Application**— The Android UI, asset resources, build files, and Kotlin/Java components that provide the relevant application logic that interacts with the UI and C++ Kompute ML bindings.
- **Android NDK Kompute ML Module**— The Kompute ML C++ code and bindings configured through Android NDK for GPU accelerated processing.

## Android SDK Application

This section covers the Android SDK Java/Kotlin and User Interface components, which should provide an intuition on how the high level business logic interacts with the native C++ JNI bindings.

The user interface consists primarily of input text boxes and display text labels to enable users to interact with the GPU Accelerated ML processing C++ core (as shown in the screenshot below). If you are curious on exactly the views used, you can inspect it in your Android Studio project, or directly open the `activity_kompute_jni.xml`[file](https://github.com/EthicalML/vulkan-kompute/blob/v0.3.2/examples/android/android-simple/app/src/main/res/layout/activity_kompute_jni.xml).

The core of our mobile app can be found in the `app/src/main/java/com/ethicalml/kompute` folder, inside the `KomputeJni.kt`[file](https://github.com/EthicalML/vulkan-kompute/blob/v0.3.2/examples/android/android-simple/app/src/main/java/com/ethicalml/kompute/KomputeJni.kt). This Kotlin file contains the main business logic for our Android app.

If we look at the shortened version of the class in the code block below we will notice the following key points:

- `fun onCreate(…)` — This function is called on initialisation of the Android Activity (when the app is loaded)
- `fun KomputeButtonOnClick(…)`— This function is triggered when the main “KOMPUTE” button gets pressed, and triggers the C++ Jni binding functions using the data from the user interface text boxes.
- `external fun initVulkan(): Boolean` — This function is one of the C++ JNI functions that will be bound to the Vulkan initialisation C++ function.
- `external fun kompute(...): FloatArray` — The is the C++ JNI function that will train the ML model and run inference on the inputs provided, returned the inference results.
- `external fun komputeParams(...): FloatArray` — The C++ JNI function that trains the model and returns the learned parameters `weight 1` , `weight 2` and `bias` .
- `companion object { ...("kompute-jni") }` — This is the name you will give to your C++ output shared library, which will contain the compiled C++ source with all relevant binding functions.

As you will also notice, the `external fun` functions do not have any definition — this is because the definition is provided in the C++ JNI function bindings, which will be covered in the [**C++ JNI bindings section**](http://jni/).

Now to cover each of the functions in more detail, we start with the `onCreate` function. This function is in charge of initialising all relevant components in our application. This includes:

- `val binding` — This is the main object that will allow us to access all the text boxes and elements in the UI.
- `val successVulkanInit = initVulkan()` — This is our first call to a C++ JNI function, which is primarily in charge of initialising Vulkan. If it’s successful it returns `true`, and we display the respective success message in a `android.widget.Toast` popup — an error is displayed otherwise.

Next up we have the `KomputeButtonOnClick(...)` function. This function gets triggered when the user presses the `“KOMPUTE”` button in the app. The main purpose of this function is to retrieve the inputs from the input text boxes in the UI, then use the input data to perform an ML train/inference step through the JNI C++ bindings, and finally display the resulting outputs back in the UI text labels. In further detail:

- `val <elementname> = findViewById<EditText>(R.id.<elementname>)`— This is the format of the steps that create the variable that holds the respective text box with inputs. In this case `<elementname>` is the name of the element we are interacting with.
- `xi, xj and y` — The `FloatArray` elements created from the text in the respective input boxes, which are then used for the ML model processing.
- `val out = kompute(xi, xj, y)` — Here we run the C++ JNI Binding function `kompute` which trains and processes the data through the KomputeModelML class we create in C++.
- `val params = komputeParams(xi, xj, y)` — Here we run the C++ JNI Binding function which trains and returns the learned parameters of the Kompute machine learning model.
- `<elementname>.text = <value>` — The lines that follow this format basically override the text labels in the UI to display the outputs.

The last few functions are only explicitly set as external functions to be bound to the C++ JNI bindings. Furthermore the `companion object` section provides the name of the shared library that will contain the respective bindings referenced in this activity.

You can find the full file in the `KomputeJni.kt`[file](https://github.com/EthicalML/vulkan-kompute/blob/v0.3.2/examples/android/android-simple/app/src/main/java/com/ethicalml/kompute/KomputeJni.kt) in the repository.

## Android NDK Kompute ML Module

This section covers the **Android NDK Kompute ML Module** files, which includes the build-system, and the C++ source code using the [**Kompute framework**](https://github.com/EthicalML/vulkan-kompute).

Kompute [Architecture Design](https://ethicalml.github.io/vulkan-kompute/overview/reference.html) (Image by Author)

We will be using the core components of Kompute which are outlined in this accompanying diagram. Namely, we will be loading the relevant data in the GPU using Kompute Tensors, processing it with the respective Kompute Operations, and orchestrating this with a Kompute Sequence and a Kompute Manager. We won’t be covering the Kompute architecture in detail but if you want to learn more about the underlying concepts, you can check out the more detailed article on [the underlying implementation](https://towardsdatascience.com/machine-learning-and-data-processing-in-the-gpu-with-vulkan-kompute-c9350e5e5d3a).

The core components in the Android NDK bindings module consist of the following:

- **JNI Binding Functions** — The native functions that can be called from the Java/Kotlin Android SDK application code.
- **KomputeModelML Class** — The class that exposes the Kompute GPU Accelerated ML model logic.
- **CMake build file**— The C++ build file responsible for compiling and linking all relevant libraries.

### JNI Binding Functions

The JNI bindings in this case are provided via the `KomputeJniNative.cpp`[file](https://github.com/EthicalML/vulkan-kompute/blob/v0.3.2/examples/android/android-simple/app/src/main/cpp/KomputeJniNative.cpp). The skeleton of the class is below — the function code logic has been redacted for simplicity, and will be explained in more detail below.

The JNI binding functions have to match the class functions defined in the Java/Kotlin code. The format for the function is:

- `Java_<modulepath>_<class>_<functionname>(env, thiz, ...params)`

In our case the class is in the `com.ethicalml.kompute` module, in the class `KomputeJni` and its respective function — below the name of the functions will reflect this structure.

Diving one level deeper, we can now go through each section of the file. Starting with the imports, we can see below the imports together with comments outlining their core functionality.

In Android applications, we actually need to initialize the Vulkan dynamic library manually (which is something that you normally wouldn’t do outside of Android). The reason why this is required, is because the Vulkan library is not actually linked in Android phones. The reason why Android avoids doing any linking is for backwards compatibility, mainly to ensure the app doesn’t crash if the Vulkan library is not found in older phones.

This means we need to manually find the library in the C++ code and if found, link each function to its respective memory address pointer so our C++ framework can use it. Fortunately, this is something that Kompute does automatically, and we won’t be covering the details in this article as it probably would require an article in itself, but if you’re interested you can read more about it in [**this post**](https://marcelbraghetto.github.io/a-simple-triangle/2019/06/16/part-17/), and you can see how Kompute imports Vulkan dynamically in the [Core.hpp header file](https://github.com/EthicalML/vulkan-kompute/blob/45ddfe524b9ed63c5fe1fc33773c8f93a18e2fac/src/include/kompute/Core.hpp#L5) using the `vk_ndk_wrapper_include`[files](https://github.com/EthicalML/vulkan-kompute/tree/45ddfe524b9ed63c5fe1fc33773c8f93a18e2fac/vk_ndk_wrapper_include).

Below you can see the implementation of the function that exposes the `initVulkan` logic—`Java_com_ethicalml_kompute_KomputeJni_initVulkan(...)`. You can see inside this function we run `InitVulkan()`until the Vulkan library is successfully initialised, or alternatively fails if the maximum number of retries is reached.

Once Vulkan has been initialised, it is possible to call the remaining functions. The first one is the `kompute` function, which is in charge of training the model and running an inference request. The function receives the input Xi and Xj values, together with the expected predictions that the model will learn from. It will then return the prediction treating Xi and Xj as unseen data. The function will basically call the `KomputeModelML` class `train` function and `predict` function.

The last remaining JNI function that will be exposed to the Java/Kotlin code is the `komputeParams` function, which is in charge of returning the parameters that the machine learning model learns, namely the `weight 1` , `weight 2` and the `bias` parameters.

The only remaining functions are the utility functions that we used in the JNI logic — namely `jfloatArrayToVector` and `vectorToJFloatArray` — these functions are self explanatory, so we’ll leave it to the reader to explore further in the source if interested.

### KomputeModelML Class

Now that we’ve covered the key functions that are bound to the Kotlin / Java class, we can cover the `KomputeModelML` C++ class that contains the Kompute GPU Accelerated logic.

The header file for the KomputeModelML class is outlined below, and contains the following key components:

- `#include "kompute/Kompute.hpp”` — header containing all the Kompute dependencies that we’ll use in this project
- `void train(...)` —Trains the machine learning model using the GPU native code for the logistic regression model. It takes the input array(s) `X`, and the array `y`containing the expected outputs.
- `std::vector<float> predict(...)` —Perform the inference request. In this implementation it is not using GPU code as generally there tends to be less performance gains through parallelization on the inference side. However there are still expected performance gains if multiple inputs are processed in parallel (which this function allows for).
- `std::vector<float> get_params()` —Returns an array containing the learned parameters in the format of `[ <weight_1>, <weight_2>, <bias> ]`.
- `static std::string LR_SHADER`— The [shader code that will be executed as machine code inside of the GPU](https://en.wikipedia.org/wiki/OpenGL_Shading_Language). Kompute allows us to pass a string containing the code, however for production deployments it is possible to convert the shaders to binary, and also use the utilities available to convert into header files.

If you are interested in the full implementation you can find all the files in [the repository](https://github.com/EthicalML/vulkan-kompute/tree/v0.3.2/examples/android/android-simple). Furthermore if you are interested in the theoretical and underlying foundational concepts of these techniques, this is covered fully in [our previous post](https://towardsdatascience.com/machine-learning-and-data-processing-in-the-gpu-with-vulkan-kompute-c9350e5e5d3a#6c88).

### CMake Build File

The `CMakeLists.txt`[**build file**](https://github.com/EthicalML/vulkan-kompute/blob/v0.3.2/examples/android/android-simple/app/src/main/cpp/CMakeLists.txt) is a very important component in the Android NDK workflow. This section becomes particularly important if you wish to add Kompute into your own project. The cmake file is quite small so we’ll be covering each of the lines separately.

First we need to make sure the Kompute library is available. Usually you would run the `INSTALL`target of the Kompute build to be able to use/import the respective library. However in this case we need to make sure Kompute is built for the right Android CPU architecture —our simplest option is adding the main repository as part of the build, which means that Kompute will also be built for the right mobile architectures. If you want to include this in your project, you just need to make sure the path is relative to the Kompute cloned folder.

We now set the variable VK_ANDROID_INCLUDE_DIR to the vulkan include directory. This contains all the include files we need for Vulkan — for completeness, Kompute uses the `vulkan.h` header as well as the `vulkan.hpp` C++ headers.

We are now able to add the library that will be used by the Java/Kotlin Android Studio project, which in this case is the shared library `kompute-jni`.

We now are able to add all relevant `include` directories. This includes the `VK_ANDROID_INCLUDE_DIR`which we defined above, as well as the `VK_ANDROID_COMMON_DIR` which contains Android `log.h` . The `single_include` is what contains the `kompute/Kompute.hpp` header from Kompute. Finally, we need to import the Kompute Dynamic library wrapper `vk_ndk_wrapper_include` which is necessary as the Vulkan library is imported dynamically. The logic behind this could become a series of articles in itself, so we won’t go down this rabbit-hole, but if you’re interested you can read more in [**this post**](https://marcelbraghetto.github.io/a-simple-triangle/2019/06/16/part-17/), and you can see how Kompute imports [**Vulkan dynamically**](https://github.com/EthicalML/vulkan-kompute/blob/45ddfe524b9ed63c5fe1fc33773c8f93a18e2fac/src/include/kompute/Core.hpp#L5).

To compile the project we’ll want to make sure the `VK_USE_PLATFORM_ANDROID_KHR` is set, as this is what enables the Android configuration. For this project we also disable the Vulkan debug layers with `KOMPUTE_DISABLE_VK_DEBUG_LAYERS.`

Finally, we are able to link the relevant libraries to our `kompute-jni` shared library target. This includes:

- `kompute`— This is the library created in the Kompute build.
- `kompute_vk_ndk_wrapper` — This library also gets created by the Kompute build and contains the code to dynamically load and wrap the Vulkan library.
- `log` — This is the Android log library, which is required by Kompute to override logging.
- `android` — This is the Android library which is used by the Android project.

That’s it — you are now able to run the application, which will execute the full build. You should then be able to see the Kompute app in your Android Studio emulator, or in you physical phone, where you’ll be able to trigger the processing on your on-device GPU.

Android Studio Running Project in Emulator (Image by Author)

## What’s next?

Congratulations, you’ve made it all the way to the end! Although there was a broad range of topics covered in this post, there is a massive amount of concepts that were skimmed through. These include the underlying Android Development workflows, Vulkan concepts, GPU computing fundamentals, machine learning best practices, and more advanced Kompute concepts. Luckily, there are resources online to expand your knowledge on each of these. Here are some links I recommend for further reading:

- “[Machine Learning in Mobile & Cross-Vendor GPUs Made Simple With Kompute & Vulkan](https://towardsdatascience.com/machine-learning-and-data-processing-in-the-gpu-with-vulkan-kompute-c9350e5e5d3a)” article with a deeper dive in theory and concepts
- “[Parallelizing GPU-intensive Workloads via Multi-Queue Concurrency using Kompute](https://towardsdatascience.com/parallelizing-heavy-gpu-workloads-via-multi-queue-operations-50a38b15a1dc)” with more advanced Kompute concepts
- [Kompute Documentation](https://axsaucedo.github.io/vulkan-kompute/) for more details and further examples
- [The Machine Learning Engineer Newsletter](https://ethical.institute/mle.html) if you want to keep updated on articles around Machine Learning
- [Android NDK Getting Started Documentation](https://developer.android.com/ndk/guides) if you want to dive further into the Native Development Kit
- [Awesome Production Machine Learning](https://github.com/EthicalML/awesome-production-machine-learning/) list for open source tools to deploy, monitor, version and scale your machine learning
- [Introduction to ML for Coders course](https://www.fast.ai/2018/09/26/ml-launch/) by FastAI to learn further machine learning concepts
- [Vulkan SDK Tutorial](https://vulkan-tutorial.com/) for a deep dive into the underlying Vulkan components
